from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Categorias, Produtos

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/produtos")
def criar_produto(nome: str, categoria: str, db: Session = Depends(get_db)):

    categoria_obj = db.query(Categorias).filter(Categorias.name == categoria).first()
    if not categoria_obj:
        raise HTTPException(status_code=404, detail="Categoria não encontrada")

    produto = Produtos(name=nome, categoria_id=categoria_obj.id)
    db.add(produto)
    db.commit()
    db.refresh(produto)

    return {"detail": f"Produto '{produto.name}' criado com sucesso na categoria '{categoria_obj.name}'."}

@app.delete("/produtos/{produto_id}")
def excluir_produto(produto_id: int, db: Session = Depends(get_db)):
    produto = db.query(Produtos).filter(Produtos.id == produto_id).first()
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    db.delete(produto)
    db.commit()

    return {"detail": "Produto deletado com sucesso"}

@app.post("/categorias")
def criar_categoria(nome: str, db: Session = Depends(get_db)):
    categoria = Categorias(name=nome)
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
        raise HTTPException(status_code=400, detail="Não é possível deletar a categoria pois existem produtos associados a ela.")

    db.delete(categoria)
    db.commit()

    return {"detail": "Categoria deletada com sucesso"}

@app.get("/categorias")
def listar_categorias(db: Session = Depends(get_db)):

    categorias = db.query(Categorias).all()
    return [{"id": categoria.id, "nome": categoria.name} for categoria in categorias]

@app.get("/produtos")
def listar_produtos(db: Session = Depends(get_db)):

    produtos = db.query(Produtos).all()
    return [{"id": produto.id, "nome": produto.name, "categoria_id": produto.categoria_id} for produto in produtos]