from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

@pytest.fixture
def criar_produto_teste():
    # Cria uma categoria
    client.post(
        "/categorias",
        json={"name": "Eletrônicos"}
    )
    categoria_name = response.json()["nome"]

    # Cria um produto nessa categoria
    response = client.post(
        "/produtos",
        json={
            "name": "Smartphone",
            "categoria": categoria_name
        }
    )

    data = response.json()

    return data["id"]

def test_salvar_produto_lista(override_get_db, criar_produto_teste):
    produto_id = criar_produto_teste

    response = client.post(
        "/lista",
        json={
            "produto_id": produto_id,
            "quantidade": 1
        }
    )

    data = response.json()
    assert data["message"] == f"Produto alicate salvo na lista"

def test_retornar_lista(override_get_db):
    response = client.get(
        "/lista"
    )

    data = response.json()
    assert type(data["message"]) == list
    assert data is not None

def test_atualizar_quantidade_lista(override_get_db, criar_produto_teste):
    id_produto = criar_produto_teste

    response = client.put(
        f"/lista/{id_produto}",
        json={
            "quantidade": 2
        }
        )
    
    data = response.json()

    assert data["message"] == "Quantidade do produto atualizada"

def test_excluir_produto_lista(override_get_db, criar_produto_teste):
    id_produto = criar_produto_teste

    response = client.delete(
        f"/lista/{id_produto}"
        )
    
    data = response.json()

    assert data["message"] == "Produto removido da lista com sucesso"