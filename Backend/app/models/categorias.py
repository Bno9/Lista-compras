from sqlalchemy import String
from typing import List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class Categorias(Base):
    __tablename__ = "categorias"
    
    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    produto: Mapped[List["Produtos"]] = relationship(
        back_populates="categoria"
    )