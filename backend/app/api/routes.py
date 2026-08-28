from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional, cast

from app.db.session import get_async_session
from app.db.models import User, UserRole, VictimProfile, CounselorProfile
from app.api.deps import get_current_user, require_role
from app.core.security import verify_password, create_access_token, get_password_hash
from app.schemas import Token, CheckInCreate, VictimCaseResponse, VictimRegister, CounselorRegister

router = APIRouter()

# ---------------------------------------------------------
# 1. Authentication Routes
# ---------------------------------------------------------

# Login endpoint for both Victims and Counselors/Admins
@router.post("/auth/login", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_async_session)
):
    # Victims login with phone_number, Counselors/Admins with email
    # form_data.username will contain whichever they input
    stmt = select(User).where(
        (User.phone_number == form_data.username) | (User.email == form_data.username)
    )
    result = await db.execute(stmt)
    user = result.scalars().first()

    if not user or not verify_password(form_data.password, cast(str, user.hashed_password)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/phone or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(subject=str(user.id))
    return {"access_token": access_token, "token_type": "bearer"}

# Endpoint to register a new victim
@router.post("/auth/register/victim", status_code=status.HTTP_201_CREATED)
async def register_victim(
    data: VictimRegister, 
    db: AsyncSession = Depends(get_async_session)
):
    # 1. Check if user already exists
    stmt = select(User).where(User.phone_number == data.phone_number)
    result = await db.execute(stmt)
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Phone number already registered")
        
    stmt_case = select(VictimProfile).where(VictimProfile.nhaa_case_id == data.nhaa_case_id)
    result_case = await db.execute(stmt_case)
    if result_case.scalars().first():
        raise HTTPException(status_code=400, detail="NHAA Case ID already registered")

    # 2. Create base user
    new_user = User(
        phone_number=data.phone_number,
        hashed_password=get_password_hash(data.password),
        role=UserRole.VICTIM
    )
    db.add(new_user)
    await db.flush() # Flushes to generate the new_user.id without committing

    # 3. Create victim profile linked to the user
    new_profile = VictimProfile(
        user_id=new_user.id,
        nhaa_case_id=data.nhaa_case_id,
        full_name=data.full_name,
        preferred_language=data.preferred_language
    )
    db.add(new_profile)
    
    await db.commit()
    return {"message": "Victim registered successfully"}

# Endpoint to register a new counselor
@router.post("/auth/register/counselor", status_code=status.HTTP_201_CREATED)
async def register_counselor(
    data: CounselorRegister, 
    db: AsyncSession = Depends(get_async_session)
):
    # 1. Check if user already exists
    stmt = select(User).where(User.email == data.email)
    result = await db.execute(stmt)
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2. Create base user
    new_user = User(
        email=data.email,
        hashed_password=get_password_hash(data.password),
        role=UserRole.COUNSELOR
    )
    db.add(new_user)
    await db.flush()

    # 3. Create counselor profile
    new_profile = CounselorProfile(
        user_id=new_user.id,
        full_name=data.full_name,
        district=data.district,
        specialization=data.specialization
    )
    db.add(new_profile)
    
    await db.commit()
    return {"message": "Counselor registered successfully"}

# ---------------------------------------------------------
# 2. Victim Routes
# ---------------------------------------------------------

@router.post("/victims/check-in")
async def submit_check_in(
    data: CheckInCreate,
    current_user: User = Depends(require_role(UserRole.VICTIM)),
    db: AsyncSession = Depends(get_async_session)
):
    """
    Receives raw text or audio URLs from the victim. 
    In the next phase, we will offload this to Celery for AI processing.
    """
    # Verify victim profile exists
    stmt = select(VictimProfile).where(VictimProfile.user_id == current_user.id)
    result = await db.execute(stmt)
    victim = result.scalars().first()

    if not victim:
        raise HTTPException(status_code=404, detail="Victim profile not found")

    # TODO: Save to InteractionLog, trigger Celery task for NLP/Voice Stress Analysis
    
    return {
        "status": "success", 
        "message": "Check-in received and queued for analysis."
    }

# ---------------------------------------------------------
# 3. Counselor Routes
# ---------------------------------------------------------

@router.get("/counselors/my-cases", response_model=List[VictimCaseResponse])
async def get_assigned_cases(
    current_user: User = Depends(require_role(UserRole.COUNSELOR)),
    db: AsyncSession = Depends(get_async_session)
):
    """
    Returns all victims assigned to the currently authenticated counselor.
    """
    # 1. Find the counselor profile
    stmt = select(CounselorProfile).where(CounselorProfile.user_id == current_user.id)
    result = await db.execute(stmt)
    counselor = result.scalars().first()

    if not counselor:
        raise HTTPException(status_code=404, detail="Counselor profile not found")

    # 2. Fetch assigned victims
    cases_stmt = select(VictimProfile).where(VictimProfile.counselor_id == counselor.id)
    cases_result = await db.execute(cases_stmt)
    assigned_victims = cases_result.scalars().all()

    return assigned_victims