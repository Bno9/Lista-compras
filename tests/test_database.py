from app.models.categorias import Categorias
from app.models.produtos import Produtos
import pytest

def test_database(db):
    assert db is not None

def test_criar_categoria(db):
    categoria = Categorias(nome="Ferramentas")

    db.add(categoria)
    db.commit()
    db.refresh(categoria)

    assert categoria.id is not None
    assert categoria.nome == "Ferramentas"

def test_buscar_categoria(db):
    categoria = Categorias(nome="Ferramentas")

    db.add(categoria)
    db.commit()

    resultado = db.query(Categorias).filter(
        Categorias.nome == "Ferramentas"
    ).first()

    assert resultado is not None
    assert resultado.nome == "Ferramentas"

def test_remover_categoria(db):
    categoria = Categorias(nome="Ferramentas")

    db.add(categoria)
    db.commit()

    resultado = db.query(Categorias).filter(
        Categorias.nome == "Ferramentas"
    ).first()

    assert resultado is not None

    db.delete(categoria)
    db.commit()

    resultado = db.query(Categorias).filter(
        Categorias.nome == "Ferramentas"
    ).first()

    assert resultado is None

def test_criar_produto(db):
    categoria = Categorias(nome="Ferramentas")
    db.add(categoria)
    db.commit()

    produto = Produtos(
        nome="Alicate",
        categoria_id=categoria.id
    )

    db.add(produto)
    db.commit()
    db.refresh(produto)

    assert produto.id is not None
    assert produto.nome == "Alicate"
    assert produto.categoria_id == categoria.id

def test_relacionamento_produto_categoria(db):
    categoria = Categorias(nome="Ferramentas")
    db.add(categoria)
    db.commit()

    produto = Produtos(
        nome="Alicate",
        categoria_id=categoria.id
    )

    db.add(produto)
    db.commit()
    db.refresh(produto)

    assert produto.categoria.id == categoria.id
    assert produto.categoria.nome == "Ferramentas"

def test_produtos_da_categoria(db):
    categoria = Categorias(nome="Ferramentas")
    db.add(categoria)
    db.commit()

    produto = Produtos(
        nome="Alicate",
        categoria_id=categoria.id
    )

    db.add(produto)
    db.commit()

    db.refresh(categoria)

    assert len(categoria.produtos) == 1
    assert categoria.produtos[0].nome == "Alicate"