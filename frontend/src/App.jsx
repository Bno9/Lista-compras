import { useEffect, useState } from 'react'
import ListaContext from './context/ListaContext'

import Lista from './components/Lista'
import Cadastro from './components/Cadastro'
import Produtos from './components/Produtos'

import './app.css'


function App() {
  const [lista, setLista] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5000/lista')
      .then((response) => response.json())
      .then((data) => setLista(data))
      .catch((error) => console.error('Erro ao buscar a lista:', error))
  }, [])

  return (
    <ListaContext.Provider value={{ lista, setLista }}>
      <Lista />
      <Cadastro />
      <Produtos />
    </ListaContext.Provider>
  )
}

export default App
