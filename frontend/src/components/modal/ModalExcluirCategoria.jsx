function ModalExcluirCategoria({ fechar }) {

    function deletarCategoria(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        fetch(`http://127.0.0.1:5000/categorias/${data.name}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response =>{ 
            if (!response.ok) {
                    throw new Error(`HTTP code: ${response.status}`)
                }

                console.log(response.json())
            })
        .catch(error => {
            console.error('Erro ao excluir categoria:', error)
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">

            <form
                onSubmit={deletarCategoria}
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            >

                <h2 className="mb-6 text-center text-2xl font-bold">
                    Excluir Categoria
                </h2>

                <div className="mb-4 flex flex-col gap-2">
                    <label
                        htmlFor="nome-categoria"
                        className="font-medium"
                    >
                        Nome da categoria
                    </label>

                    <input
                        id="nome-categoria"
                        type="text"
                        name="name"
                        placeholder="Digite o nome da categoria"
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

export default ModalExcluirCategoria