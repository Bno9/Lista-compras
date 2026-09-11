from tests.fixtures.testClient import client
from tests.fixtures.produto_teste import criar_produto_teste
import pytest

def test_salvar_produto_lista(override_get_db, criar_produto_teste):
    produto_id = criar_produto_teste

    response = client.post(
        "/lista",
        json={
            "id_produto": produto_id,
            "quantidade": 1
        }
    )

    data = response.json()

    assert response.status_code == 201
    assert  "id" in data

def test_retornar_lista(override_get_db):
    response = client.get(
        "/lista"
    )

    data = response.json()

    assert response.status_code == 200
    assert type(data["produtos"]) == list
    assert data is not None

def test_atualizar_quantidade_lista(override_get_db, criar_produto_teste):
    id_produto = criar_produto_teste

    client.post(
        f"/lista/",
        json={
            "id_produto": id_produto,
            "quantidade": 2
        }
        )
    
    response = client.post(
        f"/lista/",
        json={
            "id_produto": id_produto,
            "quantidade": 2
        }
        )
    
    data = response.json()

    assert response.status_code == 201
    assert data["message"] == "Quantidade do produto atualizada na lista"

def test_excluir_produto_lista(override_get_db, criar_produto_teste):
    id_produto = criar_produto_teste

    client.post(
        f"/lista/",
        json={
            "id_produto": id_produto,
            "quantidade": 2
        }
        )

    response = client.delete(
        f"/lista/{id_produto}"
        )
    
    data = response.json()

    assert response.status_code == 200
    assert data["message"] == "Produto removido da lista"