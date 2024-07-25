export function getAulas(id) {
    console.log(`http://localhost:8080/aula/treinamento/5`)
    let response = fetch(`http://localhost:8080/aula/treinamento/${id}`,{
        method:"GET"
    }).then(
        response=>response.json()
    )
    return response
}


export function postAulas(aulas,alunos){

    let aulas_json = {
        "aulas": aulas,
        "alunos":alunos
    }
    fetch("http://localhost:8080/aula",
        {
            method:"POST",
            body: JSON.stringify(aulas_json),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
}