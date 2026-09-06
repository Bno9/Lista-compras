import { useContext } from "react"
import ListaContext from "../context/ListaContext"

function Lista() {
  const { lista, setLista } = useContext(ListaContext)

  return (
    <section className="w-full max-w-md mx-auto p-4">
      
      <h1 className="text-2xl font-bold text-center mb-4">
        Lista de Produtos
      </h1>

      <div className="max-h-75 overflow-y-auto border rounded-lg p-3">
        <ul className="space-y-2">

          <div className="flex justify-between gap-4">
            <span className="font-bold uppercase">Nome</span>
            <span className="font-bold uppercase">Quantidade</span>
            <span></span>
            <span></span>
          </div>

          {lista.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center text-lg"
            >
              <span className="uppercase">
                {item.nome}
              </span>

              <span className="font-bold">
                {item.quantidade}
              </span>

              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setLista((prevLista) => prevLista.filter((i) => i.id !== item.id))}>
                Remover
              </button>
            </li>
          ))}

        </ul>
      </div>

    </section>
  )
}

export default Lista