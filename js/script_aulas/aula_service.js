import { returnBaseUrl } from "../enviroment/enviroment.js";
export function getAulas(id) {
    
    let response = fetch(`${returnBaseUrl()}/aula/treinamento/${id}`,{
        method:"GET",
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    }).then(
        response=>response.json()
    )
    return response
}


export async function postAulas(aulas,alunos){

    let aulas_json = {
        "aulas": aulas,
        "alunos":alunos
    }
    return await fetch(`${returnBaseUrl()}/aula`,
        {
            method:"POST",
            body: JSON.stringify(aulas_json),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'ngrok-skip-browser-warning': 'true'
            }
        })
    
}


export async function deleteAulas(ids_aulas_deletadas_ou_nao){
    let responses = ids_aulas_deletadas_ou_nao.ids_aulas_deletadas.map(id_aula_deletada => {
        return fetch(`${returnBaseUrl()}/aula/${id_aula_deletada.id}`,
            {
                method:"DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'ngrok-skip-browser-warning': 'true'
                }
            })
      
    });
    return await Promise.all(responses)
}

async function putAlunosAulas(id_treinamento,ids_aulas_nao_deletadas,ids_alunos_nao_deletados,ids_alunos_deletados,ids_alunos_adicionados){
    let aulas_json = {
        "alunos_deletados": ids_alunos_deletados,
        "alunos_adicionados": ids_alunos_adicionados,
        "id_treinamento": parseInt(id_treinamento)
    }
    
    
    return await fetch(`${returnBaseUrl()}/aula/users/edit`,
        {
            method:"PUT",
            body: JSON.stringify(aulas_json),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'ngrok-skip-browser-warning': 'true'
            }
        })
}

export async function alterarAulasTreinamento(id_treinamento,aulas,alunos,ids_aulas_deletadas_ou_nao,ids_alunos_deletados_ou_nao){
    
    let aulas_sem_id = []
    
    aulas.forEach(
        aula=>{
            if(!aula.id){
                aulas_sem_id.push(aula)
            }else{
                
                ids_aulas_deletadas_ou_nao.ids_aulas_nao_deletadas.push({"id":aula.id})
                
                ids_aulas_deletadas_ou_nao.ids_aulas_deletadas.forEach(
                    id_aula_deletada =>{
                        
                        if(id_aula_deletada === aula.id){
                            ids_aulas_deletadas_ou_nao.ids_aulas_nao_deletadas.splice(ids_alunos_deletados_ou_nao.ids_aulas_nao_deletadas.indexOf((aula.id)),1)
                        }    
                    }
                )
            }
        } 
    )
    
    alunos.forEach(
        aluno=> {
            ids_alunos_deletados_ou_nao.ids_alunos_nao_deletados.push({"id":aluno.id})           
        }
    )
    const lista_responses = []
    
    lista_responses.push(await deleteAulas(ids_aulas_deletadas_ou_nao))
    lista_responses.push(await postAulas(aulas_sem_id,alunos))
    lista_responses.push( await putAlunosAulas(id_treinamento,ids_aulas_deletadas_ou_nao.ids_aulas_nao_deletadas, ids_alunos_deletados_ou_nao.ids_alunos_nao_deletados,ids_alunos_deletados_ou_nao.ids_alunos_deletados,ids_alunos_deletados_ou_nao.ids_alunos_adicionados))   
    return Promise.all(lista_responses)
}



