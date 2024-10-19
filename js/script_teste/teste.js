import { SelectTreinamento } from "../components/SelectTreinamento/index.js"
import { getTreinamento, getTreinamentos } from "../script_treinamentos/treinamento_service.js"
import { PopUpQuestionario } from "./components/PopUpQuestionario/index.js"
import { getQuestionario, postQuestionario } from "./questionario_service.js"

const btn_criar_questao = document.querySelector("#btn_criar_questao")
const pop_up_criacao_questao = document.querySelector("#pop_up_criacao_questao")
const tipo_questao = document.querySelector("#tipo_questao")
const div_criacao_questao_especificada = document.querySelector("#div_criacao_questao_especificada")
const close_pop_up_adicionar_questao = document.querySelector("#close_pop_up_adicionar_questao")
const btn_adicionar_questao = document.querySelector("#btn-adicionar-questao")
const selectTreinamento = new SelectTreinamento()
selectTreinamento.init()
const btn_adicionar_questionario = document.querySelector("#btn_adicionar_questionario")
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

btn_criar_questao.addEventListener("click", () => {
    pop_up_criacao_questao.classList.remove("d-none")

        div_criacao_questao_especificada.innerHTML = QuestaoObjetiva()

        // Gera as alternativas ao mudar a quantidade
        document.querySelector("#quantidade_alternativas").addEventListener("change", (e) => {
            let quantidade_alternativas = parseInt(e.target.value, 10)
            let alternativas = ''

            for (let i = 1; i <= quantidade_alternativas; i++) {
                alternativas += `
                    <label>Alternativa ${i}</label>
                    <input name="alternativa${i}" placeholder="Conteúdo da alternativa" alternativa>
                    <br>
                `
            }

            document.querySelector("#objetiva").innerHTML = `
                ${alternativas}
                <p>Selecione a resposta correta:</p>
                <select name="resposta" id="resposta"></select>
            `

            // Após as alternativas serem geradas, preenche as opções de resposta
            exibirRespostas()

            // Adiciona event listeners para inputs de alternativas
            adicionarListenersParaAlternativas()
        })
})

close_pop_up_adicionar_questao.addEventListener("click", () => {
    pop_up_criacao_questao.classList.add("d-none")
})

btn_adicionar_questao.addEventListener("click", () => {
    let dadosQuestao = {}
    let alternativas = []
    let numero_alternativa = 0

    // Acessa os elementos apenas após eles serem gerados
    pop_up_criacao_questao.querySelectorAll("[alternativa]").forEach(alternativa => {
        numero_alternativa++
        alternativas.push(alternativa.value)
    })

    dadosQuestao["pergunta"] = document.querySelector("#pergunta").value
    dadosQuestao["alternativas"] = alternativas
    dadosQuestao["resposta"] = document.querySelector("#resposta").value
    questoes.push(dadosQuestao)
    guardarDadosDB(questoes)
    exibirQuestoes(questoes)
})


function exibirQuestoes(questoes) {
    const questoesContainer = document.querySelector("#questoes")
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
    `

    questoesContainer.querySelectorAll(".btn-excluir").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index")
            excluirQuestao(index)
        })
    })
}

function excluirQuestao(index) {
    const item = document.getElementById(`questao-${index}`)
    item.classList.add('fade-out')

    setTimeout(() => {
        questoes.splice(index, 1)
        exibirQuestoes(questoes)
    }, 500)
}

async function exibirTreinamentos() {
    let pageable = await getTreinamentos()
    pageable = await getTreinamentos(0,pageable.totalElements)
    const treinamentos = pageable.content
    selectTreinamento.setTreinamentos(treinamentos)
    selectTreinamento.exibeSelectTreinamento()
}

function guardarDadosDB(questoes) {
    btn_adicionar_questionario.addEventListener("click", () => {
        questionario["id_treinamento"] = parseInt(select_treinamento.value)
        questionario["questoes"] = questoes

        postQuestionario(questionario)
            .then(() => {
                modal.showModal()
                btn_close_pop_up.addEventListener("click", () => {
                    window.location.href = "/pages/criarQuestionario.html"
                })
            })
            .catch((erro) => {
                console.error("Erro ao criar questionário:", erro)
            })
    })
}

function exibirRespostas() {
    const respostaSelect = document.querySelector("#resposta")
    const alternativas = document.querySelectorAll("[alternativa]")

    respostaSelect.innerHTML = Array.from(alternativas).map((alternativa, index) => `
        <option value="${alternativa.value}">Alternativa ${index + 1}</option>
    `).join('')
}

function adicionarListenersParaAlternativas() {
    const alternativasInputs = document.querySelectorAll("[alternativa]")

    alternativasInputs.forEach(input => {
        input.addEventListener("input", () => {
            exibirRespostas() // Atualiza o select de respostas sempre que o valor de uma alternativa muda
        })
    })
}

async function exibirQuestionario() {
        const questionario = await getQuestionario(selectTreinamento.getValue())
        const treinamento = await getTreinamento(questionario.id_treinamento)
        document.querySelector("#questionarioModal").innerHTML = PopUpQuestionario({questoes:questionario.questoes || [] ,nomeTreinamento:treinamento.nome})
}

async function controlarAtivacaoDoBotaoDeExibicaoQuestionario() {
    const questionario = await getQuestionario(selectTreinamento.getValue());
    if (questionario.status === 500) {
        document.querySelector("#btn_exibir_questionario").setAttribute("disabled","")
        console.log(questionario)
    }else{
        document.querySelector("#btn_exibir_questionario").removeAttribute("disabled")
    }
}

selectTreinamento.getSelectTreinamentoHTML().addEventListener("change",async()=>{
    await exibirQuestionario()
    await controlarAtivacaoDoBotaoDeExibicaoQuestionario()
})

exibirTreinamentos().then(
    async()=>{
        await exibirQuestionario()
        await controlarAtivacaoDoBotaoDeExibicaoQuestionario()
    }
)
