import { useState } from 'react'

import ModalProduto from './modal/ModalProduto'
import ModalCategoria from './modal/ModalCategoria'

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
        className="w-full rounded-lg bg-blue-500 px-5 py-3 font-bold text-white shadow transition hover:bg-blue-600 active:scale-95 sm:w-auto"
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

      {modal === "produto" && (
        <ModalProduto fechar={() => setModal(null)}/>
      )}

      {modal === "categoria" && (
        <ModalCategoria fechar={() => setModal(null)}/>
      )}

    </div>
  )
}

export default Cadastro