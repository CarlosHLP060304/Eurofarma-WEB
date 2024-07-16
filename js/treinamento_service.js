
export function getTreinamentos(){
    let response =  fetch("http://localhost:8080/treinamento",{
        method:"GET",
    }).then(
        response => response.json()
    )
    return response
}

export function postTreinamento(){
    let treinamento = JSON.parse(localStorage.getItem("treinamento"))
    fetch("http://localhost:8080/treinamento",{
        method:"POST",
        body: JSON.stringify(treinamento)
    })
}

export function deleteTreinamento(id){
    fetch(`http://localhost:8080/treinamento/${id}`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    })
}
