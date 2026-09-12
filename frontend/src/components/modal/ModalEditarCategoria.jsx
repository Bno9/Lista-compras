import { useContext, useState } from "react"
import CategoriasContext from "../../context/CategoriasContext"

function ModalEditarCategoria({fechar}) {

    const { categorias, setCategorias } = useContext(CategoriasContext)
    const [categoriaName, setName] = useState(null)
    const [categoriaSelecionada, setCategoria] = useState(null)

    function editarCategoria(){
        
        fetch(`${import.meta.env.VITE_API_URL}/categorias/${categoriaSelecionada}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: categoriaName
            })
            }).then(response => {
                if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`)
                }

                return response.json()
            })
            .then(data => {

                setCategorias(prevCategorias => prevCategorias.map(c =>
                    c.name === categoriaSelecionada ? {...c, name: categoriaName} : c
                ))
                
                fechar()
            })
            .catch(error => {
                console.error("Erro ao atualizar categoria:", error)
            })
        }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                <h1 className="mb-6 text-center text-xl font-bold text-gray-800">
                    Alterar categoria
                </h1>

                <div className="flex flex-col gap-4">

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
                            onChange={(e) => setCategoria(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            {categorias.map((c) => (
                                <option key={c.id} value={c.nome}>
                                    {c.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="novoNome"
                            className="mb-1 block text-sm font-semibold text-gray-700"
                        >
                            Novo nome
                        </label>

                        <input
                            type="text"
                            name="novoNome"
                            id="novoNome"
                            placeholder="Novo nome"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                </div>

                <div className="mt-6 flex gap-3">

                    <button
                        className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 font-semibold text-gray-700 transition hover:bg-gray-200 active:scale-95"
                        onClick={fechar}
                    >
                        Cancelar
                    </button>

                    <button
                        className="w-full rounded-lg bg-green-500 px-4 py-2.5 font-semibold text-white transition hover:bg-green-600 active:scale-95"
                        onClick={() => editarCategoria()}
                    >
                        Editar
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ModalEditarCategoria