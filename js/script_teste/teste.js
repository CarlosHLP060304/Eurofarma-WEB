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
const btn_close_pop_up = document.querySelector("#close_pop_up_questionario")
const modal = document.querySelector("dialog")
let questoes = []
let questionario = {}

function QuestaoObjetiva() {
    return `
        <label>Digite a pergunta da questão: </label>
        <br>
        <input type="text" id="pergunta">
        <br>
        <label>Escolha a quantidade de alternativas:</label>
        <br>
        <select id="quantidade_alternativas">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <br>
        <div id="objetiva"></div>
    `;
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



tipo_questao.addEventListener("change", () => {
    let valor_tipo_questao = tipo_questao.value;

    if (valor_tipo_questao === "objetiva") {
        div_criacao_questao_especificada.innerHTML = QuestaoObjetiva();

       
        document.querySelector("#quantidade_alternativas").addEventListener("change", (e) => {
            let quantidade_alternativas = parseInt(e.target.value, 10);
            let alternativas = '';

            for (let i = 1; i <= quantidade_alternativas; i++) {
                alternativas += `
                    <label>Alternativa ${i}</label>
                    <input name="alternativa${i}" placeholder="Conteúdo da alternativa" alternativa>
                    <br>
                `;
            }

            document.querySelector("#objetiva").innerHTML = `
                ${alternativas}
                <p>Selecione a resposta correta:</p>
                <select name="resposta" id="resposta">
                    ${Array.from({ length: quantidade_alternativas }, (v, i) => `<option value="alternativa${i+1}">Alternativa ${i+1}</option>`).join('')}
                </select>
            `;
        });
    } else {
        div_criacao_questao_especificada.innerHTML = '';
    }
});



function exibirQuestoes(questoes) {
    const questoesContainer = document.querySelector("#questoes");
    questoesContainer.innerHTML = `
        ${questoes.map((questao, index) => `
         
<li id="questao-${index}" class="list-group-item mb-3 p-3 shadow-sm rounded">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="me-3 mb-0">Questão ${index + 1}</h3>
        <i type="button" class="btn-excluir text-danger" data-index="${index}" style="cursor: pointer; font-size: 1.5rem;">❌</i>
    </div>
    <ul class="list-unstyled">
        <li class="mb-3"><strong>Pergunta:</strong> ${questao.pergunta}</li>
        <li class="mb-3">
            <strong>Alternativas:</strong>
            <ol class="ps-3">
                ${questao.alternativas.map(alternativa => `<li>${alternativa}</li>`).join("")}
            </ol>
        </li>
        <li><strong>Resposta:</strong> ${questao.resposta}</li>
    </ul>
</li>




        `).join("")}
    `;


    questoesContainer.querySelectorAll(".btn-excluir").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            excluirQuestao(index);
        });
    });
}





function excluirQuestao(index) {

    const item = document.getElementById(`questao-${index}`);
    
    // Adiciona a classe de animação
    item.classList.add('fade-out');
    
    // Remove o item após o tempo da animação
    setTimeout(() => {
        // Remove o item do array e da exibição
        questoes.splice(index, 1);
        exibirQuestoes(questoes);
    }, 500); // 500ms corresponde ao tempo da animação
}



async function exibirTreinamentos(){
    const pageable = await getTreinamentos()
    const treinamentos = pageable.content
    console.log(treinamentos)
    select_treinamento.innerHTML = `
        ${treinamentos.map(
            treinamento => {
            if(treinamento.ativo == true){
               return `
                <option value=${treinamento.id}>${treinamento.nome}</option>
            `
            }}
               
        )}
    `
}


function guardarDadosDB(questoes) {
    btn_adicionar_questionario.addEventListener("click", () => {
        questionario["id_treinamento"] = parseInt(select_treinamento.value);
        questionario["questoes"] = questoes;

        postQuestionario(questionario)
            .then(() => {
               
              
                    modal.showModal();

                   
                    const btn_close_pop_up = document.querySelector("#close_pop_up_questionario");
                    btn_close_pop_up.addEventListener("click", () => {
                        window.location.href="/pages/criarQuestionario.html" 
                    });
                
            })
            .catch((erro) => {
                console.error("Erro ao criar questionário:", erro);
            });
    });
}



exibirTreinamentos()