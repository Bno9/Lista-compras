from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import dotenv
import os

dotenv.load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL1", "sqlite:///./test.db")

class Base(DeclarativeBase):
    pass

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from . import models #importa os modelos que estão no __init__.py para criar as tabelas
    
Base.metadata.create_all(bind=engine)