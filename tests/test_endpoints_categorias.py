from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

def test_criar_categoria():
    response = client.post(
        "/categorias",
        json={"nome": "Ferramentas"}
    )

    assert response.status_code == 201

    data = response.json()

    assert data["nome"] == "Ferramentas"
    assert "id" in data

def test_excluir_categoria():
    # Cria uma categoria
    response = client.post(
        "/categorias",
        json={"nome": "Móveis"}
    )
    assert response.status_code == 201

    categoria_id = response.json()["id"]

    # Exclui a categoria
    response = client.delete(f"/categorias/{categoria_id}")
    assert response.status_code == 200

    data = response.json()
    assert data["detail"] == "Categoria deletada com sucesso"

def test_excluir_categoria_com_produtos():
    # Cria uma categoria
    response = client.post(
        "/categorias",
        json={"nome": "Alimentos"}
    )
    assert response.status_code == 201

    categoria_id = response.json()["id"]

    # Cria um produto nessa categoria
    response = client.post(
        "/produtos",
        json={
            "nome": "Arroz",
            "categoria_id": categoria_id
        }
    )
    assert response.status_code == 201

    # Agora, tenta excluir a categoria
    response = client.delete(f"/categorias/{categoria_id}")
    assert response.status_code == 400

    data = response.json()
    assert data["detail"] == "Não é possível deletar uma categoria que possui produtos"
