from tests.fixtures.testClient import client
from tests.fixtures.produto_teste import criar_produto_teste

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

def test_deletar_produto(override_get_db, criar_produto_teste):
    produto_id = criar_produto_teste

    # Deleta o produto
    response = client.delete(f"/produtos/{produto_id}")
    assert response.status_code == 200

    data = response.json()
    assert data["message"] == "Produto deletado com sucesso"

def test_deletar_produto_inexistente(override_get_db):
    response = client.delete("/produtos/999")
    assert response.status_code == 404

    data = response.json()
    assert data["detail"] == "Produto não encontrado"

def test_atualizar_produto(override_get_db, criar_produto_teste):
    produto_id = criar_produto_teste

    client.post(
        "/categorias",
        json={"name": "Teste"}
    )

    response = client.put(f"/produtos/{produto_id}",
                          json={
                              "name": "Teste",
                              "categoria_id": 2
                          })
    assert response.status_code == 200

    data = response.json()
    assert data["message"] == "Produto atualizado"