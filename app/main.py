from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Categorias, Produtos
from pydantic import BaseModel


class CategoriaCreate(BaseModel):
    name: str

class ProdutoCreate(BaseModel):
    name: str
    categoria: str

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/produtos", status_code=201)
def criar_produto(produto: ProdutoCreate, db: Session = Depends(get_db)):

    categoria_obj = db.query(Categorias).filter(Categorias.name == produto.categoria).first()
    if not categoria_obj:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    produto = Produtos(name=produto.name, categoria_id=categoria_obj.id)
    db.add(produto)
    db.commit()
    db.refresh(produto)

    return {"name": produto.name, 'categoria': categoria_obj.name, "id": produto.id}

@app.delete("/produtos/{produto_id}")
def excluir_produto(produto_id: int, db: Session = Depends(get_db)):
    produto = db.query(Produtos).filter(Produtos.id == produto_id).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    db.delete(produto)
    db.commit()

    return {"detail": "Produto deletado com sucesso"}

@app.get("/produtos")
def listar_produtos(db: Session = Depends(get_db)):

    produtos = db.query(Produtos).all()

    if not produtos:
        raise HTTPException(status_code=404, detail="Nenhum produto encontrado")

    return [{"id": produto.id, "nome": produto.name, "categoria_id": produto.categoria_id} for produto in produtos]

@app.get("/produtos/{nome}")
def buscar_produto_por_nome(nome: str, db: Session = Depends(get_db)):
    produto = db.query(Produtos).filter(Produtos.name == nome).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    return {"id": produto.id, "nome": produto.name, "categoria_id": produto.categoria_id}


# Endpoints para categorias

@app.post("/categorias", status_code=201)
def criar_categoria(categoria: CategoriaCreate, db: Session = Depends(get_db)):
    categoria = Categorias(name=categoria.name)
    db.add(categoria)
    db.commit()
    db.refresh(categoria)

    return {"id": categoria.id, "nome": categoria.name}

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

    return {"detail": "Categoria deletada com sucesso"}

@app.get("/categorias")
def listar_categorias(db: Session = Depends(get_db)):

    categorias = db.query(Categorias).all()

    if not categorias:
        raise HTTPException(status_code=404, detail="Nenhuma categoria encontrada")

    return [{"id": categoria.id, "nome": categoria.name} for categoria in categorias]

@app.get("/categorias/{nome}")
def buscar_categoria_por_nome(nome: str, db: Session = Depends(get_db)):
    categoria = db.query(Categorias).filter(Categorias.name == nome).first()
    
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    return {"id": categoria.id, "nome": categoria.name}