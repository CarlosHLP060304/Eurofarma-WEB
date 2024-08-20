import { getTreinamentos } from "../script_treinamentos/treinamento_service.js"
import { postQuestionario } from "./questionario_service.js"

const btn_criar_questao = document.querySelector("#btn_criar_questao")
const pop_up_criacao_questao = document.querySelector("#pop_up_criacao_questao")
const tipo_questao = document.querySelector("#tipo_questao")
const div_criacao_questao_especificada = document.querySelector("#div_criacao_questao_especificada")
const close_pop_up_adicionar_questao = document.querySelector("#close_pop_up_adicionar_questao")
const btn_adicionar_questao = document.querySelector("#btn-adicionar-questao")
const select_treinamento =  document.querySelector("#select_treinamento")
const btn_adicionar_questionario =  document.querySelector("#btn_adicionar_questionario")
let questoes = []
let questionario = {}

function QuestaoObjetiva(){
    return `
        <label>Digite a pergunta da questão:</label>
        <input type="text" id="pergunta">
        <label>Digite a quantidade de alternativas:</label>
        <input type="number" placeholder="5" id="quantidade_alternativas">
        <button class="btn btn-info" id="exibir_alternativas">Exibir</button>
        <div id="objetiva">
            
        </div>
    `
}

btn_criar_questao.addEventListener("click",()=>{
    pop_up_criacao_questao.classList.remove("d-none")
})


close_pop_up_adicionar_questao.addEventListener("click",()=>{
    pop_up_criacao_questao.classList.add("d-none")
})

 
btn_adicionar_questao.addEventListener("click",()=>{
    let dadosQuestao = {}
    let alternativas = []
    let numero_alternativa = 0
    console.log(pop_up_criacao_questao.querySelectorAll("[alternativa]"))
    pop_up_criacao_questao.querySelectorAll("[alternativa]").forEach(
        alternativa => {
            numero_alternativa++
            alternativas.push(alternativa.value)
        }
    )
    dadosQuestao["pergunta"] = document.querySelector("#pergunta").value
    dadosQuestao["alternativas"] = alternativas
    dadosQuestao["resposta"] = document.querySelector("#resposta").value
    questoes.push(dadosQuestao) 
    console.log(questoes)
    guardarDadosDB(questoes)
    exibirQuestoes(questoes)
})



tipo_questao.addEventListener("change",()=>{
    let valor_tipo_questao = tipo_questao.value
    if(valor_tipo_questao === "objetiva"){
        div_criacao_questao_especificada.innerHTML = QuestaoObjetiva()
        document.addEventListener("click",(e)=>{
            if(e.target.id === "exibir_alternativas"){
                let quantidade_alternativas = document.querySelector("#quantidade_alternativas").value
                let alternativas = ``
                for (let i = 1; i <= quantidade_alternativas; i++) {
                    alternativas += `
                     <label>Alternativa ${i}</label>
                     <input name="alternativa${i}" placeholder="Conteúdo da alternativa" alternativa>
                     <br>`
                }
                document.querySelector("#objetiva").innerHTML = `
                ${alternativas}
                <p>Digite a resposta correta:</p>
                <input type="text" name="resposta" id="resposta">`
                
            }
        })
    }else{
        div_criacao_questao_especificada.innerHTML = `` 
    }
})


function exibirQuestoes(questoes){
    document.querySelector("#questoes").innerHTML = `
        ${
            questoes.map(
                questao=>
                    `
                    <li>
                    <h3>Questão ${questoes.indexOf(questao)}</h3>
                    <span>${JSON.stringify(questao)}</span>
                    </li>
                `
            ).join("")
        }
    `
}

async function exibirTreinamentos(){
    const pageable = await getTreinamentos()
    const treinamentos = pageable.content
    console.log(treinamentos)
    select_treinamento.innerHTML = `
        ${treinamentos.map(
            treinamento => `
                <option value=${treinamento.id}>${treinamento.nome}</option>
            `
        )}
    `
}


function guardarDadosDB(questoes){
    btn_adicionar_questionario.addEventListener("click",()=>{
        questionario["id_treinamento"] =  parseInt(select_treinamento.value)
        questionario["questoes"] = questoes
        postQuestionario(questionario)
    })
}

exibirTreinamentos()