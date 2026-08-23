from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

def test_criar_categoria(override_get_db):
    response = client.post(
        "/categorias",
        json={"name": "Ferramentas"}
    )

    assert response.status_code == 201

    data = response.json()

    assert data["nome"] == "Ferramentas"
    assert "id" in data

def test_excluir_categoria(override_get_db):
    # Cria uma categoria
    response = client.post(
        "/categorias",
        json={"name": "Móveis"}
    )

    categoria_name = response.json()["nome"]

    # Exclui a categoria
    response = client.delete(f"/categorias/{categoria_name}")
    assert response.status_code == 200

    data = response.json()
    assert data["detail"] == "Categoria deletada com sucesso"

def test_excluir_categoria_com_produtos(override_get_db):
    # Cria uma categoria
    response = client.post(
        "/categorias",
        json={"name": "Alimentos"}
    )

    categoria_name = response.json()["nome"]

    # Cria um produto nessa categoria
    response = client.post(
        "/produtos",
        json={
            "name": "Arroz",
            "categoria": categoria_name
        }
    )

    # Agora, tenta excluir a categoria
    response = client.delete(f"/categorias/{categoria_name}")
    assert response.status_code == 400

    data = response.json()
    assert data["detail"] == "Não é possível deletar uma categoria que possui produtos"
