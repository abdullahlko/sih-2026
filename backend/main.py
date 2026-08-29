from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.routes import router

@asynccontextmanager
async def lifespan(app : FastAPI):
    yield

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

app.include_router(router, prefix=settings.API_V1_STR)

@app.get("/health")
def health_check():
    return {"status": "ok"}