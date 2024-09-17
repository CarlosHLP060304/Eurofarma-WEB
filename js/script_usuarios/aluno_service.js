import { returnBaseUrl } from "../enviroment/enviroment.js";

export function getFuncionarios() {
    let response =  fetch(`${returnBaseUrl()}/usuario`,{
        method:"GET",
    }).then(
        response => response.json()
    )
    return response
}

export function getAlunosByTreinamento(id_treinamento) {
    let response =  fetch(`${returnBaseUrl()}/usuario/treinamento/${id_treinamento}`,{
        method:"GET",
    }).then(
        response => response.json()
    )
    return response
}

export function getSetoresAlunos(){
    let response = fetch(`${returnBaseUrl()}/usuario/setor`,{
        method:"GET",
    }).then(
        response => response.json()
    )
    return response
}

export async function adicionarAlunosNovos(listaAlunosPesquisa,alunos_adicionados,id_treinamento){
    
    if(id_treinamento){
        const alunos_banco = await getAlunosByTreinamento(id_treinamento)
        
        listaAlunosPesquisa.forEach(alunoPesquisa => {
            const idProcurado = alunoPesquisa.id
        
            const usuarioEncontrado = alunos_banco.find(aluno => aluno.id === idProcurado);
        
            if (!usuarioEncontrado) {
                alunos_adicionados.push(idProcurado)
                console.log(alunos_adicionados)
            }
        });
    }else{
        listaAlunosPesquisa.forEach(alunoPesquisa => {
            alunos_adicionados.push(alunoPesquisa)
        });
        //console.log(alunos_adicionados)
    }

}


export async function deleteUsuarios(id_treinamento){
    const usuarios_banco = await getAlunosByTreinamento(id_treinamento)
    
    usuarios_banco.forEach(usuario => {
        fetch(`${returnBaseUrl()}/usuario/treinamento/${id_treinamento}`,
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
    const response_presencas_aluno = await fetch(`${returnBaseUrl()}/treinamento/findByAluno/${id_aluno}`)
    const presencas_aluno = await response_presencas_aluno.json() 
    const dados_basicos_aluno = await getAlunoById(id_aluno)

    let dadosAluno =  {presencas_aluno,dados_basicos_aluno} //une os dois objetos em um único
    return dadosAluno
}

export async function getAlunoById(id_aluno){
        let response = fetch(`${returnBaseUrl()}/usuario/${id_aluno}`,{
            method:"GET",
        }).then(
            response => response.json()
        )
        return response
}
