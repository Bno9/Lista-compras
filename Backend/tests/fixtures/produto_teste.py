import pytest
from tests.fixtures.testClient import client

@pytest.fixture
def criar_produto_teste():
    # Cria uma categoria
    response = client.post(
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