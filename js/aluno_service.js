export function getFuncionarios() {
    let response =  fetch("http://localhost:8080/usuario",{
        method:"GET",
    }).then(
        response => response.json()
    )
    return response
}

