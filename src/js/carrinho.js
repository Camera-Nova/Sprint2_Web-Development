let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

let areaCarrinho = document.getElementById("itensCarrinho")

let precos = {
    "Homem de Ferro": 299,
    "Thor": 199,
    "Capitão América": 399
}

let total = 0

carrinho.forEach(function(produto, index){

    total += precos[produto]

    areaCarrinho.innerHTML += `

        <div class="card">

            <h3>${produto}</h3>

            <p>R$ ${precos[produto]}</p>

            <button onclick="removerProduto(${index})">
                Remover
            </button>

        </div>
    `
})

document.getElementById("total").innerHTML =
"Total: R$ " + total

function removerProduto(index){

    carrinho.splice(index, 1)

    localStorage.setItem("carrinho", JSON.stringify(carrinho))

    location.reload()
}