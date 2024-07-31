import { alterarApostilasTreinamento, postApostilas } from "../script_apostilas/apostila_service.js"
import { alterarAulasTreinamento, postAulas } from "../script_aulas/aula_service.js"



export function getTreinamentos(){
    let response =  fetch("http://localhost:8080/treinamento",{
        method:"GET",
    }).then(
        response => response.json()
    )
    return response
}

export function getTreinamento(id){
    let response =  fetch(`http://localhost:8080/treinamento/${id}`,{
        method:"GET",
    }).then(
        response => response.json()
    )
    return response
}

export function calculaDuracaoAula(data_inicio,data_fim){
    let dataInicio = new Date(data_inicio)
    let dataFim = new Date(data_fim)
    let totalMinutosInicio = dataInicio.getHours()*60 + dataInicio.getMinutes()
    let totalMinutosFim = dataFim.getHours()*60 + dataFim.getMinutes() 
    let diferenca_minutos = totalMinutosFim - totalMinutosInicio
    return diferenca_minutos 
}

function returnLocalOnlyTreinamento(treinamento){
    console.log(treinamento)
    delete treinamento.alunos
    delete treinamento.aulas
    delete treinamento.apostilas
    delete treinamento.sala
    return treinamento
}

function returnLocalAulas(treinamento){

    let aulas = treinamento.aulas
    
    if(treinamento.formato==="PRESENCIAL"){
        aulas = [
            {   
                "id": treinamento.aulas[0] ? treinamento.aulas[0].id : "",
                "sala": treinamento.sala,
                "nome": treinamento.nome,
                "duracao": calculaDuracaoAula(treinamento.dataInicio,treinamento.dataFim)  
            }
        ]
        console.log(aulas)
    }
    return aulas
}

function returnLocalAlunos(treinamento){
    console.log(treinamento)
    return treinamento.alunos
}

function returnLocalApostilas(treinamento){
    return treinamento.apostilas
}

export async function postTreinamento(){
    let local_storage_treinamento = JSON.parse(localStorage.getItem("treinamento"))
    console.log(local_storage_treinamento)
    let aulas = returnLocalAulas(local_storage_treinamento)
    let alunos = returnLocalAlunos(local_storage_treinamento)
    let apostilas = returnLocalApostilas(local_storage_treinamento) 
    let treinamento = returnLocalOnlyTreinamento(JSON.parse(localStorage.getItem("treinamento")))
     
    console.log(alunos)
    console.log(treinamento)
    
    let response = await fetch("http://localhost:8080/treinamento",{
        method:"POST",
        body: JSON.stringify(treinamento),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    })
    let treinamento_json = await response.json()
    console.log(treinamento_json)

    aulas.forEach(aula => {
        aula["treinamento"] = {
            "id" : treinamento_json.id
        }
    });
    postAulas(aulas,alunos)
    postApostilas(apostilas,treinamento_json.id)

    
}


export async function putTreinamento(id_treinamento,ids_aulas_deletadas_ou_nao,ids_alunos_deletados_ou_nao,ids_apostilas_deletadas_ou_nao){
    let local_storage_treinamento = JSON.parse(localStorage.getItem("treinamento"))
    let treinamento = returnLocalOnlyTreinamento(JSON.parse(localStorage.getItem("treinamento"))) 
    let aulas = returnLocalAulas(local_storage_treinamento)
    let alunos = returnLocalAlunos(local_storage_treinamento)
    let apostilas = returnLocalApostilas(local_storage_treinamento) 
    console.log(alunos)
    console.log(treinamento)

    await fetch(`http://localhost:8080/treinamento/${id_treinamento}`,{
        method:"PUT",
        body: JSON.stringify(treinamento),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    })

    aulas.forEach(aula => {
        aula["treinamento"] = {
            "id" : id_treinamento
        }
        
    });

    await alterarAulasTreinamento(id_treinamento,aulas,alunos,ids_aulas_deletadas_ou_nao,ids_alunos_deletados_ou_nao)
    alterarApostilasTreinamento(id_treinamento,apostilas,ids_apostilas_deletadas_ou_nao)
}


export function deleteTreinamento(id){
    fetch(`http://localhost:8080/treinamento/${id}`,{
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    })
}
