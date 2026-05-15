let imagens = [
    "./src/img/d2.jpeg",
    "./src/img/d4.jpg",
    "./src/img/d5.webp"
]

let index = 0

let slide = document.getElementById("slide")

document
.getElementById("proximo")
.addEventListener("click", function(){

    index++

    if(index >= imagens.length){
        index = 0
    }

    slide.src = imagens[index]
})

document
.getElementById("anterior")
.addEventListener("click", function(){

    index--

    if(index < 0){
        index = imagens.length - 1
    }

    slide.src = imagens[index]
})

document
.getElementById("botaoBoasVindas")
.addEventListener("click", function(){

    let nome = prompt("Digite seu nome")

    alert("Bem-vindo à Camera Nová, " + nome)
})

let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || []

let contador =
document.getElementById("contador")

if(contador){

    contador.innerHTML = carrinho.length
}