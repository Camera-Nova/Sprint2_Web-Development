let produtos = [

    {
        nome: "Homem de Ferro",
        preco: 299,
        imagem: "./src/img/ironman.jpg"
    },

    {
        nome: "Thor",
        preco: 199,
        imagem: "./src/img/thor.jpg"
    },

    {
        nome: "Capitão América",
        preco: 399,
        imagem: "./src/img/capitao.jpg"
    }
]

let areaProdutos = document.getElementById("produtos")

produtos.forEach(function(produto){

    areaProdutos.innerHTML += `

        <div class="card">

            <img src="${produto.imagem}">

            <h3>${produto.nome}</h3>

            <p>R$ ${produto.preco}</p>

            <button onclick="comprarProduto('${produto.nome}')">
                Comprar
            </button>

        </div>
    `
})

function comprarProduto(nome){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

    carrinho.push(nome)

    localStorage.setItem("carrinho", JSON.stringify(carrinho))

    alert(nome + " adicionado ao carrinho")
}