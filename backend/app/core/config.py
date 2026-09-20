from pydantic_settings import BaseSettings
from pathlib import Path

# This dynamically navigates up 4 levels: core -> app -> backend -> sih26
ROOT_DIR = Path(__file__).resolve().parent.parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "Samvedna AI"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days

    ADMIN_INVITE_CODE: str
    
    # Database configuration
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/sahyog_db"

    class Config:
        env_file = str(ROOT_DIR / ".env")

settings = Settings()