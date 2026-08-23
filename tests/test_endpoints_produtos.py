from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

def test_criar_produto(override_get_db):
    response = client.post(
        "/categorias",
        json={"name": "Ferramentas"}
    )

    categoria_name = response.json()["nome"]

    response = client.post(
        "/produtos",
        json={
            "name": "Alicate",
            "categoria": categoria_name
        }
    )

    assert response.status_code == 201

    data = response.json()

    assert data["name"] == "Alicate"
    assert data["categoria"] == "Ferramentas"
    assert "id" in data

def test_deletar_produto(override_get_db):
    #Cria uma categoria para poder criar o produto
    response = client.post(
        "/categorias",
        json={"name": "Ferramentas"}
    )

    # Cria um produto
    response = client.post(
        "/produtos",
        json={
            "name": "Chave de Fenda",
            "categoria": "Ferramentas"
        }
    )
    assert response.status_code == 201

    produto_id = response.json()["id"]

    # Deleta o produto
    response = client.delete(f"/produtos/{produto_id}")
    assert response.status_code == 200

    data = response.json()
    assert data["detail"] == "Produto deletado com sucesso"

def test_deletar_produto_inexistente(override_get_db):
    response = client.delete("/produtos/999")
    assert response.status_code == 404

    data = response.json()
    assert data["detail"] == "Produto não encontrado"