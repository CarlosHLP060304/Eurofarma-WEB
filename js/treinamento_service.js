function adicionarTreinamento(){
    let treinamento = JSON.parse(localStorage.getItem("treinamento"))
    fetch("http://localhost:8080/treinamento",{
        method:"POST",
        body: JSON.stringify(treinamento)
    })
}
