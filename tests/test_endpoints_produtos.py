from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

def test_criar_produto(override_get_db):
    response = client.post(
        "/categorias",
        json={"name": "Ferramentas"}
    )

    categoria_id = response.json()["id"]

    response = client.post(
        "/produtos",
        json={
            "name": "Alicate",
            "categoria_id": categoria_id
        }
    )

    assert response.status_code == 201

    data = response.json()

    assert data["nome"] == "Alicate"
    assert data["categoria_id"] == 1
    assert "id" in data

def test_deletar_produto(override_get_db):
    # Cria um produto
    response = client.post(
        "/produtos",
        json={
            "name": "Chave de Fenda",
            "categoria_id": 1
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

def test_listar_produtos_por_categoria_inexistente():
    response = client.get("/produtos/categoria/999")
    assert response.status_code == 404

    data = response.json()
    assert data["detail"] == "Categoria não encontrada"

def test_listar_produtos_por_categoria_sem_produtos():
    # Cria uma categoria sem produtos
    response = client.post(
        "/categorias",
        json={"nome": "Categoria Vazia"}
    )
    assert response.status_code == 201

    categoria_id = response.json()["id"]

    # Tenta listar produtos dessa categoria
    response = client.get(f"/produtos/categoria/{categoria_id}")
    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 0