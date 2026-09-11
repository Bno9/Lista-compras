import pytest
from sqlalchemy import StaticPool, create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, get_db
from app.main import app as fastapi_app
from tests.fixtures.produto_teste import criar_categoria_teste #import para o pytest reconhecer a fixture

TEST_DATABASE_URL = "sqlite://"

engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

@pytest.fixture
def db():   
    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture
def override_get_db(db):
    def _override_get_db():
        yield db

    fastapi_app.dependency_overrides[get_db] = _override_get_db

    yield

    fastapi_app.dependency_overrides.clear()