# Lista de compras

## Sobre o projeto

Esse é um projeto pessoal com a intenção de facilitar uma parte chata do meu trabalho. 

Toda semana eu preciso anotar em um caderno todos os produtos que estão perto de acabar, para que o responsável pelas compras possa repor o estoque. 

Como é muito chato ficar anotando os mesmos itens a mão, resolvi criar meu próprio site, onde eu cadastro todos os produtos da loja, e apenas adiciono eles a lista, sem precisar ficar escrevendo ou digitando os nomes toda vez. 

Eu poderia ter pesquisado algum site que ja fizesse isso, mas decidi me desafiar e evoluir resolvendo o problema eu mesmo

---

## Funcionalidades

### Produtos

- Cadastro de produtos
- Cadastro de categorias
- Exclusão de produtos
- Listagem de produtos
- Organização por categorias

### Lista de compras

- Adicionar produtos à lista
- Informar a quantidade necessária
- Remover produtos da lista
- Visualizar os produtos que precisam ser comprados

### Futuras funcionalidades

- [ ] Código de barras
- [ ] Imagem dos produtos
- [ ] Cache com Redis
- [ ] Sistema de login
- [ ] Outras melhorias de desempenho e organização

---

## Vantagens

Além de facilitar a minha vida, também acabo facilitando a vida do comprador, pois o site terá algumas vantagens em relação a anotar no caderno, como:

- **Evita esquecimentos:** a lista fica disponível no site e pode ser acessada pelo celular, evitando o caso de esquecer o caderno
- **Define a quantidade necessária:** Evita que o responsável compre item demais ou de menos
- **Código de barras / Imagem do produto:** Para facilitar identificação do produto (Update futuro)
- **Economiza tempo:** elimina a necessidade de escrever os mesmos produtos repetidamente.
- **Produtos nunca serão esquecidos:** Uma vez cadastrados, os produtos permanecerão no site até que sejam excluidos
- **Melhora a organização:** os produtos podem ser separados por categorias.


# Detalhes técnicos

## Tecnologias

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL

### Frontend

- React
- JavaScript
- TailwindCSS

### Testes

- Pytest
- TDD (Test-Driven Development)

## Schemas

O banco de dados utiliza um modelo relacional com os seguintes esquemas:

Categorias

id: primary key 
nome: unique

Produtos
id: primary key
nome
categoria_id: foreign key
cod_barras (futuramente)
image_url (futuramente)

Um produto pertence a uma categoria, e uma categoria a vários produtos, estabelecendo uma relação 1:N

## Testes

O backend está sendo desenvolvido utilizando TDD (Test-Driven Development)

Os testes são utilizados para validar:

Criação de categorias
Busca de categorias
Remoção de categorias
Criação de produtos
Relação entre produtos e categorias
Remoção de produtos
Comportamento dos endpoints
Validação de categorias inexistentes
Regras de negócio

Para os testes da API, é utilizado um banco SQLite separado do banco utilizado pela aplicação