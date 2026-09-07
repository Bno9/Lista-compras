import { createContext, useEffect, useState } from 'react'


const ListaContext = createContext(null)


function ListaProvider({ children }) {
  const [lista, setLista] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:5000/lista')
      .then((response) => response.json())
      .then((data) => setLista(data.produtos))
      .catch((error) => console.error('Erro ao buscar a lista:', error))
  }, [])

  lista.sort((a, b) => a.categoria.localeCompare(b.categoria))

  return (
    <ListaContext.Provider value={{ lista, setLista }}>
      {children}
    </ListaContext.Provider>
  )
}

export { ListaProvider }
export default ListaContext