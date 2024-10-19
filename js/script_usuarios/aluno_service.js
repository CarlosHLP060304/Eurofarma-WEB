import { returnBaseUrl } from "../enviroment/enviroment.js";

export function getFuncionarios(page=0,size) {
    let response =  fetch(`${returnBaseUrl()}/usuario?page=${page}&size=${size}`,{
        method:"GET",
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    }).then(
        response => response.json()
    )
    return response
}

export function getAlunosByTreinamento(id_treinamento) {
    let response =  fetch(`${returnBaseUrl()}/usuario/treinamento/${id_treinamento}`,{
        method:"GET",
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    }).then(
        response => response.json()
    )
    return response
}

export function getSetoresAlunos(){
    let response = fetch(`${returnBaseUrl()}/usuario/setor`,{
        method:"GET",
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    }).then(
        response => response.json()
    )
    return response
}


export async function deleteUsuarios(id_treinamento){
    const usuarios_banco = await getAlunosByTreinamento(id_treinamento)
    
    usuarios_banco.forEach(usuario => {
        fetch(`${returnBaseUrl()}/usuario/treinamento/${id_treinamento}`,
            {
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'ngrok-skip-browser-warning': 'true'
                }
            })
      
    });
}

export async function getHistoricoAlunoTreinamentos(id_aluno){
    const response_presencas_aluno = await fetch(
        `${returnBaseUrl()}/treinamento/findByAluno/${id_aluno}`,{
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
    })
    const presencas_aluno = await response_presencas_aluno.json() 
    const dados_basicos_aluno = await getAlunoById(id_aluno)

    let dadosAluno =  {presencas_aluno,dados_basicos_aluno} //une os dois objetos em um único
    return dadosAluno
}

export async function getAlunoById(id_aluno){
        let response = fetch(`${returnBaseUrl()}/usuario/${id_aluno}`,{
            method:"GET",
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        }).then(
            response => response.json()
        )
        return response
}
