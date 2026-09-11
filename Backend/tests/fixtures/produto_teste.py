import pytest
from tests.fixtures.testClient import client

@pytest.fixture
def criar_categoria_teste():

    response = client.post(
        "/categorias",
        json={"name": "Eletrônicos"}
    )
    categoria_name = response.json()["nome"]
    categoria_id = response.json()["id"]

    return categoria_name, categoria_id

@pytest.fixture
def criar_produto_teste(criar_categoria_teste):
    categoria = criar_categoria_teste
    categoria_name = categoria[0]

    response = client.post(
        "/produtos",
        json={
            "name": "Smartphone",
            "categoria": categoria_name
        }
    )

    data = response.json()

    return data["id"]