from pydantic import BaseModel
from typing import Optional

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