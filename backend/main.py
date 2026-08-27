from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from backend.app.db.session import engine, create_db_and_tables, get_async_session

@asynccontextmanager
async def lifespan(app : FastAPI):
    print("Initializing database and tables...")
    await create_db_and_tables()
    yield

app = FastAPI(title="My FastAPI App", lifespan=lifespan)

@app.get("/health")
def health_check():
    return {"status": "ok"}