from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from .database import get_db
from .models import Categorias, Produtos, ItemLista
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CategoriaBase(BaseModel):
    name: str

class ProdutoBase(BaseModel):
    name: str
    categoria: str

class Lista(BaseModel):
    id_produto: int
    quantidade: int


# Endpoints para produtos

@app.post("/produtos", status_code=201)
def criar_produto(produto: ProdutoBase, db: Session = Depends(get_db)):

    produto.name = produto.name.strip()

    categoria_obj = db.query(Categorias).filter(Categorias.name == produto.categoria).first()

    if not categoria_obj:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    produto = Produtos(name=produto.name, categoria_id=categoria_obj.id)
    db.add(produto)
    db.commit()
    db.refresh(produto)

    return {"name": produto.name, 'categoria': categoria_obj.name, "id": produto.id}

@app.put("/produtos/{produto_id}")
def atualizar_categoria(produto: ProdutoBase, produto_id: int, db: Session = Depends(get_db)):

    item = db.query(Produtos).filter(Produtos.id == produto_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    categoria = db.query(Categorias).filter(Categorias.name == produto.categoria).first()

    if not categoria:
        raise  HTTPException(status_code=404, detail="Categoria inexistente")

    
    item.name = produto.name
    item.categoria_id = categoria.id
    db.commit()
    db.refresh(item)

    return {"name": produto.name, "categoria": categoria.name}

@app.delete("/produtos/{produto_id}")
def excluir_produto(produto_id: int, db: Session = Depends(get_db)):

    produto = db.query(Produtos).filter(Produtos.id == produto_id).first()

    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    db.delete(produto)
    db.commit()

    return {"message": "Produto deletado com sucesso"}

@app.get("/produtos")
def listar_produtos(db: Session = Depends(get_db)):

    produtos = db.query(Produtos).all()

    if not produtos:
        raise HTTPException(status_code=404, detail="Nenhum produto encontrado")

    return [{"id": produto.id, "nome": produto.name, "categoria_id": produto.categoria_id} for produto in produtos]

@app.get("/produtos/{nome}")
def buscar_produto_por_nome(nome: str, db: Session = Depends(get_db)):

    nome = nome.strip()
    
    produto = db.query(Produtos).filter(func.lower(Produtos.name) == nome.lower()).first()
    
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    return {"id": produto.id, "nome": produto.name, "categoria_id": produto.categoria_id}



# Endpoints para categorias

@app.post("/categorias", status_code=201)
def criar_categoria(categoria: CategoriaBase, db: Session = Depends(get_db)):
    """Cria uma nova categoria no banco de dados. Não confere se a categoria já existe, porque o nome da categoria é único no schema."""

    categoria.name = categoria.name.strip()

    categoria = Categorias(name=categoria.name)
    db.add(categoria)
    db.commit()
    db.refresh(categoria)

    return {"id": categoria.id, "nome": categoria.name}

@app.put("/categorias/{categoria_name}")
def atualizar_categoria(categoria: CategoriaBase, db: Session = Depends(get_db)):

    categoria.name = categoria.name.strip()

    categoriaDB = db.query(Categorias).filter(Categorias.name == categoria.name).first()

    if not categoriaDB:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")
    
    categoriaDB.name = categoria.name
    db.commit()
    db.refresh()

@app.delete("/categorias/{categoria_name}")
def excluir_categoria(categoria_name: str, db: Session = Depends(get_db)):

    categoria = db.query(Categorias).filter(Categorias.name == categoria_name).first()
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    produtos_associados = db.query(Produtos).filter(Produtos.categoria_id == categoria.id).all()
    if produtos_associados:
        raise HTTPException(status_code=400, detail="Não é possível deletar uma categoria que possui produtos")

    db.delete(categoria)
    db.commit()

    return {"message": "Categoria deletada com sucesso"}

@app.get("/categorias")
def listar_categorias(db: Session = Depends(get_db)):

    categorias = db.query(Categorias).all()

    if not categorias:
        return []

    return [{"id": categoria.id, "nome": categoria.name, "produtos": [{"id": produto.id, "nome": produto.name} for produto in categoria.produto]} for categoria in categorias]

@app.get("/categorias/{nome}")
def buscar_categoria_por_nome(nome: str, db: Session = Depends(get_db)):
    
    categoria = db.query(Categorias).filter(Categorias.name == nome).first()

    if not categoria:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    return {"id": categoria.id, "nome": categoria.name, "produtos": [{"id": produto.id, "nome": produto.name} for produto in categoria.produto]}



# Endpoints lista


@app.get("/lista")
def retornar_lista(db: Session = Depends(get_db)):

    lista = db.query(ItemLista).all()
    
    return {"produtos": [
        {
            "id": item.produto.id, 
            "nome": item.produto.name, 
            "categoria": item.produto.categoria.name,
            "quantidade": item.quantidade
        }
        for item in lista]}


@app.post("/lista", status_code=201)
def adicionar_produto(produto: Lista, db: Session = Depends(get_db)):

    produto_obj = db.query(Produtos).filter(Produtos.id == produto.id_produto).first()

    if not produto_obj:
        raise HTTPException(
            status_code=404,
            detail="Produto não encontrado"
    )

    item_existente = db.query(ItemLista).filter(ItemLista.produto_id == produto.id_produto).first()

    if item_existente:
        item_existente.quantidade += produto.quantidade
        db.commit()
        db.refresh(item_existente)
        return {"message": "Quantidade do produto atualizada na lista"}
    
    item = ItemLista(produto_id = produto.id_produto, quantidade = produto.quantidade)

    db.add(item)
    db.commit()
    db.refresh(item)

    return { 
            "id": item.produto.id, 
            "nome": item.produto.name, 
            "categoria": item.produto.categoria.name,
            "quantidade": item.quantidade
        }

@app.put("/lista/{produto_id}")
def atualizar_produto_lista(produto: Lista, produto_id: int, db: Session = Depends(get_db)):
    
    item = db.query(ItemLista).filter(ItemLista.produto_id == produto_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item não existe na lista")
    
    item.quantidade = produto.quantidade

    db.commit()
    db.refresh(item)

    return {"message": "Quantidade do produto atualizada"}

@app.delete("/lista/{produto_id}")
def deletar_produto_lista(produto_id: int, db: Session = Depends(get_db)):
    
    item = db.query(ItemLista).filter(ItemLista.produto_id == produto_id).first()

    if not item:
        raise HTTPException(status_code=404, detail="Item não existe na lista")
    
    db.delete(item)
    db.commit()

    return {"message": "Produto removido da lista"}

@app.delete("/lista/todos")
def deletar_todos_produtos_lista(db: Session = Depends(get_db)):

    db.query(ItemLista).delete()
    db.commit()

    return {"message": "Lista apagada"}