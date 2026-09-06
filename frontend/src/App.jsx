import { useState } from 'react'
import ListaContext from './context/ListaContext'

import Lista from './components/Lista'
import Cadastro from './components/Cadastro'
import Produtos from './components/Produtos'

import './app.css'


function App() {
  const [lista, setLista] = useState([{ id: 1, nome: 'Produto 1', quantidade: 10 }, { id: 2, nome: 'Produto 2', quantidade: 5 }])

  return (
    <ListaContext.Provider value={{ lista, setLista }}>
      <Lista />
      <Cadastro />
      <Produtos />
    </ListaContext.Provider>
  )
}

export default App
