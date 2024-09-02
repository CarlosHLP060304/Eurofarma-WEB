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

export async function getHistoricoAlunoTreinamentos(id_aluno){
    const response_presencas_aluno = await fetch(`http://localhost:8080/treinamento/findByAluno/${id_aluno}`)
    const presencas_aluno = await response_presencas_aluno.json() 
    const dados_basicos_aluno = await getAlunoById(id_aluno)

    let dadosAluno =  {presencas_aluno,dados_basicos_aluno} //une os dois objetos em um único
    console.log(dadosAluno)
    return dadosAluno
}

export async function getAlunoById(id_aluno){
        let response = fetch(`http://localhost:8080/usuario/${id_aluno}`,{
            method:"GET",
        }).then(
            response => response.json()
        )
        return response
}
