from sqlalchemy import String
from typing import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base


class Categorias(Base):
    __tablename__ = "categorias"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))

    produto: Mapped[List["Produtos"]] = relationship(
        back_populates="categoria"
    )