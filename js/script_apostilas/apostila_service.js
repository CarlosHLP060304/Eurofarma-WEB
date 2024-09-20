import { returnBaseUrl } from "../enviroment/enviroment.js";

export function getApostilas(id) {
    
    let response = fetch(`${returnBaseUrl()}/apostila/treinamento/${id}`,{
        method:"GET",
        headers: {
            'ngrok-skip-browser-warning': 'true'
        }
    }).then(
        response=>response.json()
    )
    return response
}

export async function postApostilas(apostilas,treinamento_id){
    
    let promises = apostilas.map(apostila => {
        
        let apostila_json = {
            "link": apostila.link,
            "treinamento":{
                "id":treinamento_id
            }
        } 
        return fetch(`${returnBaseUrl()}/apostila`,{
            method: "POST",
            headers:
                {   'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'ngrok-skip-browser-warning': 'true'
                },
            body: JSON.stringify(apostila_json)
        })
    });
    
    return await Promise.all(promises)
}





export async function deleteApostilas(ids_apostilas_deletadas_ou_nao){
    let responses = ids_apostilas_deletadas_ou_nao.ids_apostilas_deletadas.map(apostila => {
        
        return fetch(`${returnBaseUrl()}/apostila/${apostila.id}`,{
            method: "DELETE",
            headers:
                {   'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'ngrok-skip-browser-warning': 'true'
                },
        })
    });    
    return await Promise.all(responses)
}

export async function alterarApostilasTreinamento(id_treinamento,apostilas,ids_apostilas_deletadas_ou_nao){
    
    let apostilas_sem_id = []
    let lista_responses = []
    apostilas.forEach(
        apostila=>{
            if(!apostila.id){
                apostilas_sem_id.push(apostila)
            }
        } 
    )
    lista_responses.push(await deleteApostilas(ids_apostilas_deletadas_ou_nao))
    lista_responses.push(await postApostilas(apostilas_sem_id,id_treinamento))    
    return await Promise.all(lista_responses)
}
