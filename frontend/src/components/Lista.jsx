import { useContext } from "react"
import ListaContext from "../context/ListaContext"

function Lista() {
  const { lista, setLista } = useContext(ListaContext)

  function RemoverLista(id) {
    fetch(`${import.meta.env.VITE_API_URL}/lista/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao remover o produto')
        }
        setLista((prevLista) => prevLista.filter((item) => item.id !== id))
      })
      .catch((error) => console.error('Erro ao remover o produto:', error))
  }

return (
  <section className="w-full max-w-md mx-auto p-4">

    <h1 className="text-2xl font-bold text-center mb-4">
      Lista de Produtos
    </h1>

    <div className="max-h-75 overflow-y-auto border rounded-lg p-3">

      <ul className="space-y-2">

        <li className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b pb-2">
          <span className="font-bold uppercase">
            Nome
          </span>

          {/*fiz gambiarra pra alinhar o texto do Qtd. com a quantidade */}
          <span className="font-bold uppercase mx-30"> 
            Qtd.
          </span>

          <span></span>
        </li>

        {lista.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 text-lg"
          >
            <span className="uppercase min-w-0 wrap-break-word">
              {item.nome}
            </span>

            <span className="font-bold text-center mx-2 w-16">
              {item.quantidade}
            </span>

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
              onClick={() => RemoverLista(item.id)}
            >
              Remover
            </button>
          </li>
        ))}

      </ul>

    </div>

  </section>
)}

export default Lista