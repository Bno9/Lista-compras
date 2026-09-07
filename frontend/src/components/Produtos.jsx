import { useContext, useState } from "react"
import ListaContext from "../context/ListaContext"
import CategoriasContext from "../context/CategoriasContext"

function Produtos() {
  const {categorias} = useContext(CategoriasContext)

  const [busca, setBusca] = useState("")
  const [quantidades, setQuantidades] = useState({})
  const { lista, setLista } = useContext(ListaContext)

  function AdicionarProdutoLista(produto){
    fetch(`${import.meta.env.VITE_API_URL}/lista`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "id_produto": produto.id,
        "quantidade": quantidades[produto.id] || 1
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Produto adicionado à lista:", data)
      if (data.message) {
        setLista((prevLista) => prevLista.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + (quantidades[produto.id] || 1) } : item
        ))
        return
      }
      setLista((prevLista) => [...prevLista, data])
    })
  }

  const categoriasFiltradas = categorias
  .map((categoria) => ({
    ...categoria,
    produtos: categoria.produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase())
    )
  }))
  .filter((categoria) => categoria.produtos.length > 0)

return (
  <section className="w-full max-w-6xl mx-auto p-4">

    <h2 className="text-2xl text-center font-bold uppercase mb-6">
      Produtos cadastrados
    </h2>

    <input type="text" placeholder="Buscar produto..." className="lg:w-280 w-50 border rounded-lg px-2 py-1 m-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
    onChange={(e) => {
      setBusca(e.target.value)
    }}
        />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

      {categoriasFiltradas.map((categoria) => (
        <div
          key={categoria.id}
          className="bg-white border rounded-xl shadow-sm p-4"
        >

          <h3 className="text-lg text-gray-500 font-bold uppercase border-b pb-2 mb-3 ">
            {categoria.nome}
          </h3>

          <ul className="space-y-3">

            {categoria.produtos.map((produto) => (
              <li
                key={produto.id}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
              >

                <span className="font-medium uppercase">
                  {produto.nome}
                </span>

                <div className="flex gap-2">

                <input
                  type="number"
                  placeholder="Qtd."
                  value={quantidades[produto.id] || ""}
                  onChange={(e) =>
                    setQuantidades({
                      ...quantidades,
                      [produto.id]: parseInt(e.target.value) || 1
                    })
                  }
                    className="w-20 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-lg transition"
                    onClick={() =>
                      AdicionarProdutoLista(produto, quantidades[produto.id] || 1)
                    }
                  >
                    Adicionar
                  </button>

                </div>

              </li>
            ))}

          </ul>
        </div>
      ))}

    </div>
  </section>
)}

export default Produtos