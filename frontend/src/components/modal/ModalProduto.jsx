import { useState, useEffect } from "react"

function ModalProduto({ fechar }) {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/categorias`)
            .then(response => response.json())
            .then(data => {
                setCategorias(data)
                fechar()
            })
            .catch(error => {
                console.error("Erro ao buscar categorias:", error)
            })
    }, [])
    
    function cadastrarProduto(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        data.categoria_id = parseInt(data.categoria_id)

        fetch(`${import.meta.env.VITE_API_URL}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response =>{ 
            if (!response.ok) {
                    throw new Error(`HTTP code: ${response.status}`)
                }

                console.log(response.json())
            })
        .catch(error => {
            console.error('Erro ao cadastrar produto:', error)
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">

            <form
                onSubmit={cadastrarProduto}
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            >

                <h2 className="mb-6 text-center text-2xl font-bold">
                    Cadastrar Produto
                </h2>

                <div className="mb-4 flex flex-col gap-2">
                    <label
                        htmlFor="nome-produto"
                        className="font-medium"
                    >
                        Nome do produto
                    </label>

                    <input
                        id="nome-produto"
                        type="text"
                        name="name"
                        placeholder="Digite o nome do produto"
                        className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="mb-6 flex flex-col gap-2">
                    <label
                        htmlFor="categoria-produto"
                        className="font-medium"
                    >
                        Categoria
                    </label>

                    <select
                        id="categoria-produto"
                        name="categoria"
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >

                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.nome}>
                                {categoria.nome}
                            </option>
                        ))}

                    </select>
                </div>

                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-600"
                    >
                        Cadastrar
                    </button>

                    <button
                        className="w-full rounded-lg bg-red-500 px-4 py-2  font-bold text-white transition hover:bg-red-600" 
                        onClick={fechar}
                    >
                        Fechar
                    </button>
                
                </div>

            </form>

        </div>
    )
}

export default ModalProduto