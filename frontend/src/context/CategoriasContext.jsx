import { createContext, useEffect, useState } from "react"

const CategoriasContext = createContext(null)

function CategoriasProvider({ children }) {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categorias`)
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