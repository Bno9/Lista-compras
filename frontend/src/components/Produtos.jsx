import { useContext } from "react"
import ListaContext from "../context/ListaContext"

function Produtos() {
  const { lista, setLista } = useContext(ListaContext)

  return (
    <div>
      <h2 className="flex justify-center font-bold uppercase">Lista de Produtos</h2>
    </div>
  )
}

export default Produtos