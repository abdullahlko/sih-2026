from pydantic_settings import BaseSettings
from typing import Optional
from pathlib import Path

# This dynamically navigates up 4 levels: core -> app -> backend -> sih26
ROOT_DIR = Path(__file__).resolve().parent.parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "Samvedna AI"
    API_V1_STR: str = "/api/v1"
    
    # Generate a secure key by running `openssl rand -hex 32` in your terminal
    SECRET_KEY: str = "YOUR_SUPER_SECRET_KEY_REPLACE_THIS_IN_PRODUCTION"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Database configuration
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/sahyog_db"

    class Config:
        env_file = str(ROOT_DIR / ".env")

settings = Settings()