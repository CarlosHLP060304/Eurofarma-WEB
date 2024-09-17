import { returnBaseUrl } from "../enviroment/enviroment";

export function getApostilas(id) {
    console.log(`${returnBaseUrl()}/apostila/treinamento/5`)
    let response = fetch(`${returnBaseUrl()}/apostila/treinamento/${id}`,{
        method:"GET"
    }).then(
        response=>response.json()
    )
    return response
}

export async function postApostilas(apostilas,treinamento_id){
    console.log(apostilas)
    let promises = apostilas.map(apostila => {
        console.log(apostila)
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
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            body: JSON.stringify(apostila_json)
        })
    });
    console.log(promises)
    return await Promise.all(promises)
}





export async function deleteApostilas(ids_apostilas_deletadas_ou_nao){
    let responses = ids_apostilas_deletadas_ou_nao.ids_apostilas_deletadas.map(apostila => {
        console.log(apostila)
        fetch(`${returnBaseUrl()}/apostila/${apostila.id}`,{
            method: "DELETE",
            headers:
                {   'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
        })
    });    
    return await Promise.all(responses)
}

export async function alterarApostilasTreinamento(id_treinamento,apostilas,ids_apostilas_deletadas_ou_nao){
    console.log(ids_apostilas_deletadas_ou_nao)
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
