from sqlalchemy import Column, String, Boolean, ForeignKey, DateTime, Enum, Float, Text, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from db.base import Base
import uuid
import uuid6
from sqlalchemy.dialects.postgresql import UUID

class UserRole(str, enum.Enum):
    VICTIM = "victim"
    COUNSELOR = "counselor"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    phone_number = Column(String, unique=True, index=True, nullable=False) # Primary login for victims
    email = Column(String, unique=True, index=True, nullable=True) # Primary login for counselors/admins
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.VICTIM, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    victim_profile = relationship("VictimProfile", back_populates="user", uselist=False)
    counselor_profile = relationship("CounselorProfile", back_populates="user", uselist=False)

class CounselorProfile(Base):
    __tablename__ = "counselor_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True)
    full_name = Column(String, nullable=False)
    district = Column(String, nullable=False)
    specialization = Column(String, nullable=True)

    # Relationships
    user = relationship("User", back_populates="counselor_profile")
    assigned_victims = relationship("VictimProfile", back_populates="assigned_counselor")

class VictimProfile(Base):
    __tablename__ = "victim_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True)
    nhaa_case_id = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    preferred_language = Column(String, default="hi") # 'hi', 'en', etc.
    
    # AI Monitoring Fields
    current_distress_score = Column(Float, default=0.0)
    risk_level = Column(String, default="low") # low, medium, high, critical
    
    counselor_id = Column(UUID(as_uuid=True), ForeignKey("counselor_profiles.id"), nullable=True)
    
    user = relationship("User", back_populates="victim_profile")
    assigned_counselor = relationship("CounselorProfile", back_populates="assigned_victims")
    interactions = relationship("InteractionLog", back_populates="victim")

class InteractionLog(Base):
    """Tracks chatbot, IVRS, and text check-ins for AI analysis"""
    __tablename__ = "interaction_logs"

    # Time-sortable UUID for high-performance log tracking
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid6.uuid7, index=True)

    victim_id = Column(UUID(as_uuid=True), ForeignKey("victim_profiles.id"))
    interaction_type = Column(String) # 'chatbot', 'ivrs', 'sms'
    raw_text = Column(Text, nullable=True)
    audio_url = Column(String, nullable=True)
    
    # ML Results
    sentiment_score = Column(Float, nullable=True)
    voice_stress_level = Column(Float, nullable=True)
    calculated_distress = Column(Float, nullable=True)
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    victim = relationship("VictimProfile", back_populates="interactions")


    __table_args__ = (
        # 1. Composite Index for Individual Victim Dashboards
        Index(
            'idx_victim_timestamp_desc', 
            'victim_id', 
            timestamp.desc()
        ),
        
        # 2. Composite Index for Global System-Wide Analytics
        Index(
            'idx_timestamp_desc_distress', 
            timestamp.desc(), 
            'calculated_distress'
        ),
        
        # 3. Partial Index for Real-Time Escalation/Alerting
        Index(
            'idx_critical_alerts',
            'calculated_distress',
            timestamp.desc(),
            postgresql_where=(calculated_distress >= 0.7)  # Adjust threshold as needed
        ),
    )