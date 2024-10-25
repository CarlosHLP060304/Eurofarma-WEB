import { postTreinamento, putTreinamento } from "./treinamento_service.js"
import { getTreinamento } from "../script_treinamentos/treinamento_service.js"
import { exibirAlunos, exibirApostilas, exibirAulas, exibirSelectSetores, returnMetodoDePesquisa, TreinamentoBody } from "./template_treinamento.js"
import { getAulas } from "../script_aulas/aula_service.js"
import { getApostilas } from "../script_apostilas/apostila_service.js"
import { getAlunosByTreinamento } from "../script_usuarios/aluno_service.js"
import { returnBaseUrl } from "../enviroment/enviroment.js"


let id_treinamento = window.location.search.split("=")[1]


let dadosTreinamento = {}

async function getDadosTreinamento(id_treinamento) {
    dadosTreinamento = await getTreinamento(id_treinamento)
    dadosTreinamento["aulas"] = await getAulas(id_treinamento)
    dadosTreinamento["apostilas"] = await getApostilas(id_treinamento)
    dadosTreinamento["alunos"] = await getAlunosByTreinamento(id_treinamento)
}

async function carregarDadosHTML() {
    if (id_treinamento) {
        await getDadosTreinamento(id_treinamento)

        document.querySelector("#template").innerHTML = TreinamentoBody(dadosTreinamento, id_treinamento)
        carregarElementosDinamicos(dadosTreinamento)

    } else {
        dadosTreinamento["formato"] = ""
        dadosTreinamento["aulas"] = []
        document.querySelector("#template").innerHTML = TreinamentoBody(dadosTreinamento, id_treinamento)
        carregarElementosDinamicos(dadosTreinamento)
    }
}

function carregarElementosDinamicos(dadosTreinamento) {
    const ids_aulas_deletadas_ou_nao = {
        ids_aulas_deletadas: [],
        ids_aulas_nao_deletadas: [],
    }
    const ids_apostilas_deletadas_ou_nao = {
        ids_apostilas_deletadas: [],
        ids_apostilas_nao_deletadas: []
    }
    const ids_alunos = {
        ids_alunos_deletados: [],
        ids_alunos_nao_deletados: [],
        ids_alunos_adicionados_set: new Set(),
        ids_alunos_adicionados:[]
    }

    const pop_up_aula = document.querySelector("#pop_up_aula")
    const modalidade = document.querySelector("[name='formato']")
    const conteudo_pop_up = document.querySelector("#conteudo-pop-up")
    const sessao_aulas = document.querySelector("#aulas")
    const sala = document.querySelector("#div_sala")
    const select_tipo_pesquisa = document.querySelector("#select_tipo_pesquisa")
    let dados_alunos_json = dadosTreinamento.alunos ? dadosTreinamento.alunos : []

    let aulas = dadosTreinamento.aulas ? dadosTreinamento.aulas : []
    let apostilas = dadosTreinamento.apostilas ? dadosTreinamento.apostilas : []
    let jsonPesquisa = {
        listaAlunosPesquisa: []
    }

    const btns_adicionar = document.querySelectorAll("[btn_adicionar]")

    btns_adicionar.forEach(
        btn_adicionar => {
            btn_adicionar.addEventListener("click", () => {
                if (btn_adicionar.id.endsWith("apostila")) {
                    let dados_apostila = {}
                    dados_apostila["link"] = document.querySelector('#apostila').value
                    apostilas.push(dados_apostila)

                    exibirApostilas(apostilas)

                } else if (btn_adicionar.id.endsWith("aula")) {

                    let dados_aula = {}
                    dados_aula["nome"] = document.querySelector("#aula_nome").value
                    dados_aula["duracao"] = document.querySelector("#duracao").value
                    if (modalidade.value === "presencial") {
                        dados_aula["sala"] = document.querySelector("#aula_sala").value
                        dados_aula["hora_inicio"] = document.querySelector("#aula_hora_inicio").value
                        // dados_aula["hora_fim"] = document.querySelector("#aula_hora_fim").value
                    } else {
                        dados_aula["link"] = document.querySelector("#aula_link").value
                    }
                    aulas.push(dados_aula)
                    exibirAulas(modalidade, aulas)
                } else {
                    let listaAlunosPesquisaString = jsonPesquisa.listaAlunosPesquisa.map(
                        alunoPesquisa => JSON.stringify(alunoPesquisa)
                    )
                     
                    dados_alunos_json = new Set(Array.from(dados_alunos_json).map(
                        alunoJson => JSON.stringify(alunoJson)
                    ) )

                    listaAlunosPesquisaString.forEach(element => {    
                        dados_alunos_json.add(element)
                    });

                    dados_alunos_json = Array.from(dados_alunos_json).map(
                        alunoJson => JSON.parse(alunoJson)
                    ) 

                    dados_alunos_json.forEach(
                        alunoJson => {
                            if(dadosTreinamento.alunos){
                                dadosTreinamento.alunos.forEach(
                                    alunoBanco => {
                                        if(alunoBanco.id !== alunoJson.id) {
                                            ids_alunos.ids_alunos_adicionados_set.add(alunoJson.id)
                                        } 
                                    }
                                )
                            }else{
                                ids_alunos.ids_alunos_adicionados_set.add(alunoJson.id)
                            }

                        }
                    )

                    localStorage.setItem("alunos_teste",JSON.stringify(dados_alunos_json))
                    ids_alunos.ids_alunos_adicionados = Array.from(ids_alunos.ids_alunos_adicionados_set)

                    exibirAlunos(dados_alunos_json)
                }

            })
        }
    )

    trocarDeFormatoDeTreinamento(modalidade, sessao_aulas, sala)


    document.querySelector("#btn_adicionar_aula").addEventListener("click", () => {
        pop_up_aula.classList.toggle("d-none")
        if (modalidade.value.toLowerCase() === "online") {
            conteudo_pop_up.innerHTML = `
                                <div>
                                    <label>Nome</label>
                                    <input type="text" name="nome" id="aula_nome">
                                </div>
                                 <div>
                                    <label>Link da aula</label>
                                    <input type="text" name="link" id="aula_link">
                                </div>
                                <div>
                                    <label>Duração(em minutos)</label>
                                    <input type="text" name="duracao" id="duracao">
                                </div>
                                `
        } else {
            conteudo_pop_up.innerHTML = `
        
                                <div>
                                    <label>Nome</label>
                                    <input type="text" name="nome" id="aula_nome">
                                </div>
                                    <div>
                                    <label>Sala</label>
                                    <input type="text" name="sala" id="aula_sala">
                                </div>
                                <div>
                                    <label>Hora de Início</label>
                                    <input type="time" name="hora_inicio" id="aula_hora_inicio">
                                </div>
                                <div>
                                    <label>Duração</label>
                                    <input type="text" name="duracao" id="duracao">
                                </div>
                                `
        }
    })

    document.querySelector("#btn_fechar_pop_up").addEventListener("click", () => {
        pop_up_aula.classList.add("d-none")
    })


    select_tipo_pesquisa.addEventListener(
        "change", () => {
            document.querySelector("#pesquisa_selecionada").innerHTML = returnMetodoDePesquisa(select_tipo_pesquisa.value)
            if (select_tipo_pesquisa.value === "setor") {
                exibirSelectSetores()
            }
            realizarTipoPesquisaEspecifica(select_tipo_pesquisa, jsonPesquisa)
        }
    )


    document.querySelector("#pesquisa_selecionada").innerHTML = returnMetodoDePesquisa(select_tipo_pesquisa.value)

    exibirApostilas(apostilas)
    exibirAlunos(dados_alunos_json)
    exibirAulas(modalidade, aulas)
    exibirSelectSetores()
    realizarTipoPesquisaEspecifica(select_tipo_pesquisa, jsonPesquisa)

    document.addEventListener(
        "click", (e) => {
            let btn = e.target


            if (btn.classList.contains("remove-btn")) {

                if (btn.hasAttribute("id_aluno")) {
                    guardaAlunosBancoDeletadosOuNao(btn, ids_alunos)
                    dados_alunos_json.splice(btn.getAttribute("id_aluno"), 1)
                    exibirAlunos(dados_alunos_json)
                }
                else if (btn.hasAttribute("id_aula")) {
                    guardaAulasBancoDeletadasOuNao(btn, ids_aulas_deletadas_ou_nao)
                    aulas.splice(btn.getAttribute("id_aula"), 1)
                    exibirAulas(modalidade, aulas)
                }
                else if (btn.hasAttribute("id_apostila")) {

                    guardaApostilasBancoDeletadasOuNao(btn, ids_apostilas_deletadas_ou_nao)
                    apostilas.splice(btn.getAttribute("id_apostila"), 1)
                    exibirApostilas(apostilas)
                }
            }
        }
    )

    escolheAcao(id_treinamento, aulas, apostilas, dados_alunos_json, ids_aulas_deletadas_ou_nao, ids_alunos, ids_apostilas_deletadas_ou_nao)

}

function trocarDeFormatoDeTreinamento(modalidade, sessao_aulas, sala) {
        sessao_aulas.classList.add("d-none")
        sala.classList.remove("d-none")

}

function retornaDadosTreinamento(aulas, apostilas, dados_alunos_json) {

    let dados_treinamento = document.querySelectorAll("[dado_treinamento]")

    let dados_treinamento_json = {}

    dados_treinamento.forEach(
        dado_treinamento => {
            if (dado_treinamento.name === "formato")
                dados_treinamento_json[dado_treinamento.name] = dado_treinamento.value.toUpperCase()
            else {
                dados_treinamento_json[dado_treinamento.name] = dado_treinamento.value
            }
        }
    )

    dados_treinamento_json["apostilas"] = apostilas
    dados_treinamento_json["aulas"] = aulas
    dados_treinamento_json["alunos"] = JSON.parse(localStorage.getItem("alunos_teste"))

    return dados_treinamento_json
}

function salvarTreinamento(aulas, apostilas, dados_alunos_json) {
    const btn_salvar = document.querySelector("#btn_salvar_treinamento")
    btn_salvar.addEventListener("click", () => {

        let dados_treinamento = retornaDadosTreinamento(aulas, apostilas, localStorage.getItem("alunos_teste"))

        localStorage.setItem("treinamento", JSON.stringify(dados_treinamento))
        postTreinamento()
    })
}

function salvarAlteracoes(aulas, apostilas, dados_alunos_json, id_treinamento, ids_aulas_deletadas_ou_nao, ids_alunos, ids_apostilas_deletadas_ou_nao) {
    let btn_editar_treinamento = document.querySelector("#btn_editar_treinamento")
    btn_editar_treinamento.addEventListener("click", () => {

        let dados_treinamento = retornaDadosTreinamento(aulas, apostilas, dados_alunos_json)

        localStorage.setItem("treinamento", JSON.stringify(dados_treinamento))

        putTreinamento(id_treinamento, ids_aulas_deletadas_ou_nao, ids_alunos, ids_apostilas_deletadas_ou_nao)
    })
}

function escolheAcao(id_treinamento, aulas, apostilas, dados_alunos_json, ids_aulas_deletadas_ou_nao, ids_alunos, ids_apostilas_deletadas_ou_nao) {

    if (id_treinamento) {
        salvarAlteracoes(aulas, apostilas, dados_alunos_json, id_treinamento, ids_aulas_deletadas_ou_nao, ids_alunos, ids_apostilas_deletadas_ou_nao)
    } else {
        salvarTreinamento(aulas, apostilas, dados_alunos_json)
    }
}

function guardaAulasBancoDeletadasOuNao(btn, ids_aulas_deletadas_ou_nao) {
    let id_aula_banco = btn.getAttribute("id_aula_banco")


    if (id_aula_banco !== "undefined") {
        ids_aulas_deletadas_ou_nao.ids_aulas_deletadas.push({ "id": id_aula_banco })
    }
}

function guardaAlunosBancoDeletadosOuNao(btn, ids_alunos) {
    let id_aluno_banco = btn.getAttribute("id_aluno_banco")

    if (id_aluno_banco !== "undefined") {
        ids_alunos.ids_alunos_deletados.push(parseInt(id_aluno_banco))
    }
}

function guardaApostilasBancoDeletadasOuNao(btn, ids_apostilas_deletadas_ou_nao) {
    let id_apostila_banco = btn.getAttribute("id_apostila_banco")


    if (id_apostila_banco !== "undefined") {
        ids_apostilas_deletadas_ou_nao.ids_apostilas_deletadas.push({ "id": id_apostila_banco })
    }
}

export function realizarTipoPesquisaEspecifica(select_tipo_pesquisa, jsonPesquisa) {
    let tipo_pesquisa = document.querySelector("#select_tipo_pesquisa").value
    if (select_tipo_pesquisa.value !== "setor") {
        document.getElementById("pesquisa_funcionario").addEventListener("input", async function () {
            exibirListaFuncionariosPesquisa(tipo_pesquisa, this, jsonPesquisa)
        });
    } else {
        document.querySelector("#aluno_setor").addEventListener("change", (e) => {
            exibirListaFuncionariosPesquisa(tipo_pesquisa, e.target, jsonPesquisa)
        })
    }
}

async function exibirListaFuncionariosPesquisa(tipo_pesquisa, object, jsonPesquisa) {

    let query = object.value;

    try {
        let response = null
        if (tipo_pesquisa !== "setor") {
            response = await fetch(`${returnBaseUrl()}/usuario/research/re_nome?query=${query}`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
        } else {
            query = document.querySelector("#aluno_setor").value

            response = await fetch(`${returnBaseUrl()}/usuario/setor/${query}`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
        }
        let data = await response.json();

        jsonPesquisa.listaAlunosPesquisa = data

        const list = document.querySelector("#lista_pesquisa");
        list.innerHTML = `
            ${data.map(item => {
            return returnAlunos(item)
        }).join(" ")
            }
        `

    } catch (error) {
        console.error('Erro ao buscar as sugestões:', error);
    }
}

function returnAlunos(item) {
    if (item.tipo === "ALUNO") {
        return `<li>Nome: ${item.nome} - RE: ${item.re} - Setor: ${item.setor}</li> `
    }
}

carregarDadosHTML()