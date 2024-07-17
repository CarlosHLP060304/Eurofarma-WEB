export function getApostilas(id) {
    console.log(`http://localhost:8080/apostila/treinamento/5`)
    let response = fetch(`http://localhost:8080/aula/treinamento/${id}`,{
        method:"GET"
    }).then(
        response=>response.json()
    )
    return response
}