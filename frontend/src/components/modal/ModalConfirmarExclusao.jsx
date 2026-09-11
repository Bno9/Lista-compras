function ModalConfirmarExclusao({ fechar, RemoverLista, produtoSelecionado }) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">

        <h1 className="mb-3 text-center text-xl font-bold text-gray-800">
          Remover produto?
        </h1>

        <p className="mb-6 text-center text-gray-600">
          Deseja realmente remover este produto da sua lista?
        </p>

        <div className="flex gap-3">

          <button
            onClick={fechar}
            className="w-full rounded-lg border border-gray-300 bg-green-500 px-4 py-2.5 font-semibold text-black transition hover:bg-green-700"
          >
            Não
          </button>

          <button
            onClick={() => RemoverLista(produtoSelecionado)}
            className="w-full rounded-lg bg-red-500 px-4 py-2.5 font-semibold text-black transition hover:bg-red-700"
          >
            Sim, remover
          </button>

        </div>

      </div>

    </div>
  )
}

export default ModalConfirmarExclusao
