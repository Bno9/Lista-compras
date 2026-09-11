import { useContext, useState } from "react"
import ListaContext from "../context/ListaContext"
import ModalConfirmarExclusao from "./modal/ModalConfirmarExclusao"

function Lista() {
  const { lista, setLista } = useContext(ListaContext)
  const [produtoSelecionado, setprodutoSelecionado] = useState(null)

  function RemoverLista(id) {
    //função padronizada que envia a informação para 2 endpoints diferentes
    setprodutoSelecionado(null)

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

  const listaPorCategoria = lista.reduce((acc, item) => {
    if (!acc[item.categoria]) {
      acc[item.categoria] = []
    }
    acc[item.categoria].push(item)
    return acc
  }, {})

return (
  <section className="w-full max-w-md mx-auto p-4">

    {produtoSelecionado != null && (
      <ModalConfirmarExclusao fechar={() => setprodutoSelecionado(null)} RemoverLista={RemoverLista} produtoSelecionado={produtoSelecionado}/>
    )}

    <h1 className="text-2xl font-bold text-center mb-4">
      Lista de Produtos
    </h1>

    <div className="max-h-200 overflow-y-auto border rounded-lg p-3">

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

      {Object.entries(listaPorCategoria).map(([categoria, itens]) => (  
        <div key={categoria} className="border-b pb-2 mb-2 py-5">

          <h2 className="text-xl font-bold uppercase mb-2">
            {categoria}
          </h2>

          {[...itens]
            .sort((a, b) => a.nome.localeCompare(b.nome))
            .map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 space-y-5 text-lg"
            >

              <span className={item.concluido ? "line-through text-red-600" : ""}>

                <span className={"uppercase min-w-0 wrap-break-word text-gray-600" + (item.concluido ? "text-red-600" : "")}>
                  {item.nome}
                </span>

                <span className="font-bold px-5 mx-2 w-16">
                  {item.quantidade}
                </span> 

              </span>
              
              <input type="checkbox" id={item.id} checked={item.concluido} className="h-5 w-5 cursor-pointer accent-green-600" onChange={() => {
                setLista((prevLista) =>
                  prevLista.map((produto) =>
                    produto.id === item.id
                      ? { ...produto, concluido: !produto.concluido }
                      : produto
                  )
                )
              }} />

              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-1.5 px-3 rounded-md cursor-pointer transition-colors"
                onClick={() => setprodutoSelecionado(item.id)}
              >
                Remover
              </button>
            </li>
          ))}

        </div>
      ))}

      </ul>

    </div>

      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold text-sm m-1 py-3 px-5 rounded-md cursor-pointer transition-colors"
              onClick={() => setprodutoSelecionado("todos")}
              >Apagar lista</button>
  </section>
)}

export default Lista