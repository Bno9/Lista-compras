from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.database import get_db

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}