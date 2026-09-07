import { createContext, useEffect, useState } from "react"

const CategoriasContext = createContext(null)

function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/categorias")
      .then(response => response.json())
      .then(data => {
        setCategorias(data)
      })
  }, [])

  return (
    <CategoriasContext.Provider value={{ categorias, setCategorias }}>
      {children}
    </CategoriasContext.Provider>
  )
}

export { CategoriasProvider }
export default CategoriasContext