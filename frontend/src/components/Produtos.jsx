import { useContext, useState } from "react"
import ListaContext from "../context/ListaContext"
import CategoriasContext from "../context/CategoriasContext"
import ModalEditarProduto from "./modal/ModalEditarProduto"

function Produtos() {
  const {categorias, setCategorias} = useContext(CategoriasContext)
  const { lista, setLista } = useContext(ListaContext)

  const [busca, setBusca] = useState("")
  const [quantidades, setQuantidades] = useState({})
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)

  function EditarProduto(produto, nomeNovo, categoria) {
    fetch(`${import.meta.env.VITE_API_URL}/produtos/${produto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nomeNovo,
        categoria: categoria
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`)
        }

        return response.json()
      })
      .then(data => {

        const produtoAtualizado = {
          ...produto,
          nome: data.name
        }

        setCategorias(prevCategorias => {

          // Remove o produto da categoria antiga
          const categoriasAtualizadas = prevCategorias.map(cat => ({
            ...cat,
            produtos: cat.produtos.filter(
              p => p.id !== produto.id
            )
          }))

          // Coloca o produto na nova categoria
          return categoriasAtualizadas.map(cat =>
            cat.nome === data.categoria
              ? {
                  ...cat,
                  produtos: [
                    ...cat.produtos,
                    produtoAtualizado
                  ]
                }
              : cat
          )
        })

        // Fecha o modal
        setProdutoSelecionado(null)
      })
      .catch(error => {
        console.error("Erro ao atualizar produto:", error)
      })
  }
  
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


    {produtoSelecionado != null && (<ModalEditarProduto fechar={() => setProdutoSelecionado(null)} selecionado={produtoSelecionado} EditarProduto={EditarProduto}></ModalEditarProduto>)}

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

                <span className="font-medium uppercase min-w-0 wrap-break-word">
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

                  <button   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg transition"
                    onClick={() => setProdutoSelecionado([produto, categoria])
                    }
                  >
                    Editar
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