export function getFuncionarios() {
    let response =  fetch("http://localhost:8080/usuario",{
        method:"GET",
    }).then(
        response => response.json()
    )
    return response
}

export function getAlunosByTreinamento(id_treinamento) {
    let response =  fetch(`http://localhost:8080/usuario/treinamento/${id_treinamento}`,{
        method:"GET",
    }).then(
        response => response.json()
    )
    return response
}

export async function deleteUsuarios(id_treinamento){
    const usuarios_banco = await getAlunosByTreinamento(id_treinamento)
    
    usuarios_banco.forEach(usuario => {
        fetch(`http://localhost:8080/usuario/treinamento/${id_treinamento}`,
            {
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
      
    });
}


export async function getAlunoById(id_aluno){
        let response = fetch(`http://localhost:8080/usuario/${id_aluno}`,{
            method:"GET",
        }).then(
            response => response.json()
        )
        return response
}
