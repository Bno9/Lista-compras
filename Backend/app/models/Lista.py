from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class ItemLista(Base):
    __tablename__ = "lista"

    produto_id: Mapped[int] = mapped_column(
        ForeignKey("produtos.id"), 
        primary_key=True
        )
    
    quantidade: Mapped[int] = mapped_column(
        Integer,
        nullable=False
        )

    produto: Mapped["Produtos"] = relationship(
        back_populates="itens_lista"
    )