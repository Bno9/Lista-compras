import { useContext, useState, useEffect } from "react"
import ListaContext from "../context/ListaContext"

function Produtos() {
  const [categorias, setCategorias] = useState([])
  const { lista, setLista } = useContext(ListaContext)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/categorias")
        .then(response => response.json())
        .then(data => {
            setCategorias(data)
        })
  }, [])

  function AdicionarProdutoLista(produto){
    fetch("http://127.0.0.1:5000/lista", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {"id_produto": produto.id,
            "quantidade": produto.quantidade ? produto.quantidade : 1
      }
    })
    .then(response => response.json())
    .then(data => {
      setLista((prevLista) => [...prevLista, ...data])
    })
  }

  return (
    <div>
      <h2 className="flex justify-center font-bold uppercase">Produtos cadastrados</h2>

      {categorias.map((categoria) => (
        <div key={categoria.id} className="mb-4">

          <h3 className="font-bold">{categoria.nome}</h3>

          <ul className="list-disc pl-5">
            
            {categoria.produtos.map((produto) => (
              <li key={produto.id} className="flex justify-between items-center">

                <span>{produto.nome}</span>

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => AdicionarProdutoLista(produto)}
                >Adicionar à lista</button>

              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Produtos