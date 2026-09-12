import { useContext, useState } from "react"
import CategoriasContext from "../../context/CategoriasContext"

function ModalEditarProduto({ fechar, selecionado, EditarProduto }) {
    const produto = selecionado[0]
    const categoria = selecionado[1]

    const { categorias } = useContext(CategoriasContext)
    const [nome, setNome] = useState(produto.nome)
    const [categoriaSelecionada, setCategoria] = useState(categoria.nome)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        <h1 className="mb-6 text-center text-xl font-bold text-gray-800">
          Alterar produto
        </h1>

        <div className="flex flex-col gap-4">

          <div>
            <label
              htmlFor="nome"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Nome do produto
            </label>

            <input
              type="text"
              name="nome"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>

            <label
              htmlFor="categoria"
              className="mb-1 block text-sm font-semibold text-gray-700"
            >
              Categoria
            </label>

            <select
            name="categoria"
            id="categoria"
            value={categoriaSelecionada}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
            {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nome}>
                {categoria.nome}
                </option>
            ))}
            </select>

          </div>

        </div>

        <div className="mt-6 flex gap-3">

          <button
            onClick={fechar}
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-200 active:scale-95"
          >
            Cancelar
          </button>

          <button
            onClick={() => EditarProduto(produto, nome, categoriaSelecionada)}
            className="w-full rounded-lg bg-green-500 px-4 py-2.5 font-semibold text-white transition hover:bg-green-600 active:scale-95"
          >
            Atualizar
          </button>

        </div>

      </div>

    </div>
  )
}

export default ModalEditarProduto