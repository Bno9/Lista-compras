import { useState } from 'react'

import ModalProduto from './modal/ModalProduto'
import ModalCategoria from './modal/ModalCategoria'
import ModalExcluirCategoria from './modal/ModalExcluirCategoria'
import ModalExcluirProduto from './modal/ModalExcluirProduto'
import ModalEditarCategoria from './modal/ModalEditarCategoria'

function Cadastro() {
  const [modal, setModal] = useState(null)

  return (
    <div className="flex w-full flex-col gap-3 p-4 sm:flex-row sm:justify-center">

      <button
        onClick={() =>
          modal === 'produto'
            ? setModal(null)
            : setModal('produto')
        }
        className="w-full rounded-lg bg-green-500 px-5 py-3 font-bold text-white shadow transition hover:bg-green-600 active:scale-95 sm:w-auto"
      >
        Cadastrar Produto
      </button>

      <button
        onClick={() =>
          modal === 'categoria'
            ? setModal(null)
            : setModal('categoria')
        }
        className="w-full rounded-lg bg-green-500 px-5 py-3 font-bold text-white shadow transition hover:bg-green-600 active:scale-95 sm:w-auto"
      >
        Cadastrar Categoria
      </button>

      <button
        onClick={() =>
          modal === 'editarCategoria'
            ? setModal(null)
            : setModal('editarCategoria')
        }
        className="w-full rounded-lg bg-blue-500 px-5 py-3 font-bold text-white shadow transition hover:bg-blue-600 active:scale-95 sm:w-auto"
      >
        Editar Categoria
      </button>

       <button
        onClick={() =>
          modal === 'excluirCategoria'
            ? setModal(null)
            : setModal('excluirCategoria')
        }
        className="w-full rounded-lg bg-red-500 px-5 py-3 font-bold text-white shadow transition hover:bg-red-600 active:scale-95 sm:w-auto"
      >
        Excluir Categoria
      </button>

       <button
        onClick={() =>
          modal === 'excluirProduto'
            ? setModal(null)
            : setModal('excluirProduto')
        }
        className="w-full rounded-lg bg-red-500 px-5 py-3 font-bold text-white shadow transition hover:bg-red-600 active:scale-95 sm:w-auto"
      >
        Excluir Produto
      </button>

      {modal === "produto" && (
        <ModalProduto fechar={() => setModal(null)}/>
      )}

      {modal === "categoria" && (
        <ModalCategoria fechar={() => setModal(null)}/>
      )}

      {modal === "excluirCategoria" && (
        <ModalExcluirCategoria fechar={() => setModal(null)}/>
      )}

      {modal === "excluirProduto" && (
        <ModalExcluirProduto fechar={() => setModal(null)}/>
      )}

      {modal === "editarCategoria" && (
        <ModalEditarCategoria fechar={() => setModal(null)}/>
      )}


    </div>
  )
}

export default Cadastro