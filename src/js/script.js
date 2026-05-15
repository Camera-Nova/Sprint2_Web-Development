let imagens = [
    "src/img/d5.webp",
    "src/img/d2.jpeg",
    "src/img/d4.jpg"
]

let index = 0

function trocarImagem(){

    index++

    if(index >= imagens.length){
        index = 0
    }

    document.getElementById("slide").src = imagens[index]
}

setInterval(trocarImagem, 3000)

document
.getElementById("botaoBoasVindas")
.addEventListener("click", function(){

    let nome = prompt("Digite seu nome")

    alert("Bem-vindo à TechStore, " + nome)
})