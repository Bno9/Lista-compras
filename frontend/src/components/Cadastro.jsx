import { useState } from 'react'

import ModalProduto from './modal/ModalProduto'
import ModalCategoria from './modal/ModalCategoria'

function Cadastro() {
  const [modal, setModal] = useState(null)

  return (
    <div>
      <button onClick={() => modal === 'produto' ? setModal(null) : setModal('produto') }>Cadastrar Produto</button>
      <button onClick={() => modal === 'categoria' ? setModal(null) : setModal('categoria') }>Cadastrar categoria</button>

      {modal === "produto" && (
        <ModalProduto />
      )}

      {modal === "categoria" && (
        <ModalCategoria />
      )}
      
    </div>
  )
}

export default Cadastro