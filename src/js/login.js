document
.getElementById("formLogin")
.addEventListener("submit", function(event){

    event.preventDefault()

    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    if(email === "" || senha === ""){

        alert("Preencha todos os campos")

        return
    }

    if(senha.length < 6){

        alert("A senha deve ter no mínimo 6 caracteres")

        return
    }

    alert("Login realizado com sucesso")

    window.location.href = "loja.html"
})