function ModalExcluirProduto({ fechar }) {

    function deletarProduto(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        console.log(data)

        fetch(`${import.meta.env.VITE_API_URL}/produtos/${data.name}`)
            .then(response => response.json())
            .then(produto => {
                return fetch(`${import.meta.env.VITE_API_URL}/produtos/${produto.id}`, {
                    method: 'DELETE'
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP code: ${response.status}`)
                }

                return response.json()
            })
            .then(data => {
                console.log("Produto excluído:", data)
                fechar()
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error)
            })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">

            <form
                onSubmit={deletarProduto}
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            >

                <h2 className="mb-6 text-center text-2xl font-bold">
                    Excluir Produto
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

                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-600"
                    >
                        Deletar
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

export default ModalExcluirProduto