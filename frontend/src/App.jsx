import { CategoriasProvider } from './context/CategoriasContext'
import { ListaProvider } from './context/ListaContext'

import Lista from './components/Lista'
import Cadastro from './components/Cadastro'
import Produtos from './components/Produtos'

import './app.css'


function App() {

  return (
    <ListaProvider>

      <CategoriasProvider>
        <Lista />
        <Cadastro />
        <Produtos />
      </CategoriasProvider>

    </ListaProvider>
  )
}

export default App