function ModalProduto() {
    
    function cadastrarProduto(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        data.categoria_id = parseInt(data.categoria_id)

        fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Produto cadastrado com sucesso:', data)
        })
        .catch(error => {
            console.error('Erro ao cadastrar produto:', error)
        })
    }

  return (
    <div>
      
      <form onSubmit={cadastrarProduto}>

        <label htmlFor="nome-produto">
            Nome do produto
        </label>

        <input
            id="nome-produto"
            type="text"
            name="nome"
            placeholder="Digite o nome do produto"
        />

        <label htmlFor="categoria-produto">
            Categoria
        </label>

        <select
            id="categoria-produto"
            name="categoria_id"
        >
            <option value="">Selecione uma categoria</option>
            <option value="1">Ferramentas</option>
            <option value="2">Limpeza</option>
        </select>

        <button type="submit">
            Cadastrar
        </button>

       </form>

    </div>
  )
}

export default ModalProduto