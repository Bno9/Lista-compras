function ModalCategoria() {
    function cadastrarCategoria(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        fetch('http://localhost:3000/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Categoria cadastrada com sucesso:', data)
        })
        .catch(error => {
            console.error('Erro ao cadastrar categoria:', error)
        })
    }


  return (
    <div>
      
      <form onSubmit={cadastrarCategoria}>

        <label htmlFor="nome-categoria">
            Nome da categoria
        </label>

        <input
            id="nome-categoria"
            type="text"
            name="nome"
            placeholder="Digite o nome da categoria"
        />

        <button type="submit">
            Cadastrar
        </button>

      </form>

    </div>
  )
}

export default ModalCategoria