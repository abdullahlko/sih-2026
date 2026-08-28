from pydantic import BaseModel
from typing import Optional
from app.core.security import get_password_hash

class Token(BaseModel):
    access_token: str
    token_type: str

class CheckInCreate(BaseModel):
    interaction_type: str  # e.g., 'text', 'voice'
    raw_text: Optional[str] = None
    audio_url: Optional[str] = None

class VictimCaseResponse(BaseModel):
    full_name: str
    nhaa_case_id: str
    risk_level: str
    current_distress_score: float

    class Config:
        from_attributes = True

class VictimRegister(BaseModel):
    phone_number: str
    password: str
    full_name: str
    nhaa_case_id: str
    preferred_language: str = "hi"

class CounselorRegister(BaseModel):
    email: str
    password: str
    full_name: str
    district: str
    specialization: Optional[str] = None