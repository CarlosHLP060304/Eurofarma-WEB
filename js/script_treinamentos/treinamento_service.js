import { postApostilas } from "../script_apostilas/apostila_service.js"
import { postAulas } from "../script_aulas/aula_service.js"

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

function calculaDuracaoAula(data_inicio,data_fim){
    let dataInicio = new Date(data_inicio)
    let dataFim = new Date(data_fim)
    let totalMinutosInicio = dataInicio.getHours()*60 + dataInicio.getMinutes()
    let totalMinutosFim = dataFim.getHours()*60 + dataFim.getMinutes() 
    let diferenca_minutos = totalMinutosFim - totalMinutosInicio
    return diferenca_minutos 
}

export async function postTreinamento(){
    let treinamento = JSON.parse(localStorage.getItem("treinamento"))
    console.log(treinamento)
    let aulas = treinamento.aulas
    
    if(treinamento.formato==="PRESENCIAL"){
        aulas = [
            {
                "sala": treinamento.sala,
                "nome": treinamento.nome,
                "duracao": calculaDuracaoAula(treinamento.dataInicio,treinamento.dataFim)  
            }
        ]
        console.log(aulas)
    }

    let alunos = treinamento.alunos
    console.log(alunos)
    let apostilas = treinamento.apostilas
    delete treinamento.alunos
    delete treinamento.aulas
    delete treinamento.apostilas
    delete treinamento.sala
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
        postAulas(aulas,alunos)
    });
    postApostilas(apostilas)
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
