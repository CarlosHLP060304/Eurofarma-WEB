import { postTreinamento, putTreinamento } from "./treinamento_service.js"
import { getTreinamento } from "../script_treinamentos/treinamento_service.js"
import { exibirAlunos, exibirApostilas, exibirAulas, listarAlunosSelect, TreinamentoBody } from "./template_treinamento.js"
import { getAulas } from "../script_aulas/aula_service.js"
import { getApostilas } from "../script_apostilas/apostila_service.js"
import { adicionarAlunosNovos, getAlunosByTreinamento} from "../script_usuarios/aluno_service.js"

let id_treinamento = window.location.search.split("=")[1]
console.log(id_treinamento)

let dadosTreinamento = {}


async function getDadosTreinamento(id_treinamento){
    dadosTreinamento = await getTreinamento(id_treinamento)
    dadosTreinamento["aulas"] = await getAulas(id_treinamento)
    dadosTreinamento["apostilas"] = await getApostilas(id_treinamento)
    dadosTreinamento["alunos"] = await getAlunosByTreinamento(id_treinamento)
}

async function carregarDadosHTML(){
    if(id_treinamento){
        await getDadosTreinamento(id_treinamento)
        console.log(dadosTreinamento)
        document.querySelector("#template").innerHTML = TreinamentoBody(dadosTreinamento,id_treinamento)
        carregarElementosDinamicos(dadosTreinamento)

    }else{
        dadosTreinamento["formato"] = ""
        dadosTreinamento["aulas"] = []
        document.querySelector("#template").innerHTML = TreinamentoBody(dadosTreinamento,id_treinamento)
        carregarElementosDinamicos(dadosTreinamento)
    }
}

function carregarElementosDinamicos(dadosTreinamento){
    const ids_aulas_deletadas_ou_nao = {
        ids_aulas_deletadas : [],
        ids_aulas_nao_deletadas : [],
    }
    const ids_apostilas_deletadas_ou_nao = {
        ids_apostilas_deletadas : [],
        ids_apostilas_nao_deletadas : []
    }
    const ids_alunos_deletados_ou_nao = {
        ids_alunos_deletados : [],
        ids_alunos_nao_deletados : [],
        ids_alunos_adicionados : []
    }

    const pop_up_aula= document.querySelector("#pop_up_aula")
    const modalidade = document.querySelector("[name='formato']")
    const conteudo_pop_up =  document.querySelector("#conteudo-pop-up")
    const sessao_aulas =document.querySelector("#aulas")
    const sala = document.querySelector("#div_sala")
    let dados_alunos_json = dadosTreinamento.alunos ? dadosTreinamento.alunos : []
    
    let aulas = dadosTreinamento.aulas ? dadosTreinamento.aulas : []
    let apostilas = dadosTreinamento.apostilas ? dadosTreinamento.apostilas : []
    let alunos = dadosTreinamento.alunos ? retornaListaUsuariosTreinamento(dadosTreinamento.alunos) : []

    const btns_adicionar= document.querySelectorAll("[btn_adicionar]")
    let dados_aluno = {}
    btns_adicionar.forEach(
        btn_adicionar=>{
            btn_adicionar.addEventListener("click",()=>{
                if(btn_adicionar.id.endsWith("apostila")){
                    let dados_apostila = {}
                    dados_apostila["link"] = document.querySelector('#apostila').value
                    apostilas.push(dados_apostila)
                    console.log(apostilas)
                    exibirApostilas(apostilas)
    
                }else if(btn_adicionar.id.endsWith("aula")){
                    console.log("chamou")
                    let dados_aula = {}
                    dados_aula["nome"] = document.querySelector("#aula_nome").value
                    dados_aula["duracao"] = document.querySelector("#duracao").value
                    if(modalidade.value === "presencial"){
                        dados_aula["sala"] = document.querySelector("#aula_sala").value
                        dados_aula["hora_inicio"] = document.querySelector("#aula_hora_inicio").value
                        // dados_aula["hora_fim"] = document.querySelector("#aula_hora_fim").value
                    }else{
                        dados_aula["link"] = document.querySelector("#aula_link").value
                    }
                    aulas.push(dados_aula)
                    exibirAulas(modalidade,aulas)
                }else{
                    dados_aluno = document.querySelector('#aluno').value
                    adicionarAlunosNovos(dados_aluno,ids_alunos_deletados_ou_nao.ids_alunos_adicionados,id_treinamento) 
                    let dados_aluno_json = {
                        "id":dados_aluno.split("-")[0]
                    }
                    let dados_aluno_exibicao = {
                        "exibicao": `Nome: ${dados_aluno.split("-")[1]} - RE: ${dados_aluno.split("-")[2]} - CPF: ${dados_aluno.split("-")[3]}-${dados_aluno.split("-")[4]} `,
                        "id":dados_aluno_json.id                        
                    }
                    console.log(dados_aluno.split("-"))
                    dados_alunos_json.push(dados_aluno_json)
                    alunos.push(dados_aluno_exibicao)
                    exibirAlunos(alunos)
                }
                
                
            })
        }
    )
    console.log(document.querySelectorAll(".remove-btn"))
   
    console.log(dadosTreinamento)
    
    modalidade.addEventListener("change",()=>{
        trocarDeFormatoDeTreinamento(modalidade,sessao_aulas,sala)
    })

    trocarDeFormatoDeTreinamento(modalidade,sessao_aulas,sala)
    
    
    document.querySelector("#btn_adicionar_aula").addEventListener("click",()=>{
            pop_up_aula.classList.toggle("d-none")
            if(modalidade.value.toLowerCase() === "online"){
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
            }else{
                conteudo_pop_up.innerHTML=`
        
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
        
    document.querySelector("#btn_fechar_pop_up").addEventListener("click",()=>{
        pop_up_aula.classList.add("d-none")
    })


    listarAlunosSelect()   
    exibirApostilas(apostilas)
    exibirAlunos(alunos)
    exibirAulas(modalidade,aulas)

    document.addEventListener(
        "click",(e)=>{
            let btn = e.target 
            console.log(btn.classList.contains("remove-btn"))

            if(btn.classList.contains("remove-btn")){
                    
                        if(btn.hasAttribute("id_aluno")){
                            guardaAlunosBancoDeletadosOuNao(btn,ids_alunos_deletados_ou_nao)
                            alunos.splice(btn.getAttribute("id_aluno"),1)
                            dados_alunos_json.splice(btn.getAttribute("id_aluno"),1)
                            exibirAlunos(alunos)
                        }
                        else if(btn.hasAttribute("id_aula")){
                            guardaAulasBancoDeletadasOuNao(btn,ids_aulas_deletadas_ou_nao)
                            aulas.splice(btn.getAttribute("id_aula"),1)
                            exibirAulas(modalidade,aulas)
                        }
                        else if(btn.hasAttribute("id_apostila")){
                            console.log(ids_apostilas_deletadas_ou_nao)
                            guardaApostilasBancoDeletadasOuNao(btn,ids_apostilas_deletadas_ou_nao)
                            apostilas.splice(btn.getAttribute("id_apostila"),1)
                            exibirApostilas(apostilas)
                        }
            }
        }
    )
    document.getElementById("pesquisa_funcionario").addEventListener("input", async function() {
        let tipo_pesquisa = document.querySelector("#select_tipo_pesquisa").value
        exibirPesquisaFuncionarios(tipo_pesquisa,this)
    });
      
    escolheAcao(id_treinamento,aulas,apostilas,dados_alunos_json,ids_aulas_deletadas_ou_nao,ids_alunos_deletados_ou_nao,ids_apostilas_deletadas_ou_nao)

}


function trocarDeFormatoDeTreinamento(modalidade,sessao_aulas,sala){
    if(modalidade.value.toLowerCase() === "presencial"){
        sessao_aulas.classList.add("d-none")  
        sala.classList.remove("d-none")
    }
    else{
        sessao_aulas.classList.remove("d-none")
        sala.classList.add("d-none")
    }
}

function retornaListaUsuariosTreinamento(alunos){
    let alunos_treinamento = []
    alunos.forEach(aluno => {
        let dados_aluno_exibicao = {
            "exibicao": `Nome: ${aluno.nome} - RE: ${aluno.re} - CPF: ${aluno.cpf}`,
            "id": aluno.id                    
        }
        alunos_treinamento.push(dados_aluno_exibicao)
    });
    return alunos_treinamento
}

function retornaDadosTreinamento(aulas,apostilas,dados_alunos_json){

    let dados_input_treinamento = document.querySelectorAll("input")
    let dados_select_treinamento = document.querySelectorAll("select")
    let dados_text_area_treinamento = document.querySelectorAll("textarea")
    let dados_treinamento = {}
    dados_input_treinamento.forEach(element => { 
        dados_treinamento["aulas"] = aulas
        if(element.id.startsWith("apostila"))
            dados_treinamento["apostilas"] = apostilas
        else{
            dados_treinamento[element.name] = element.value
            console.log(element)
        }
    });
    
    dados_text_area_treinamento.forEach(element=>{
        dados_treinamento[element.name] = element.value
    })
    
    dados_select_treinamento.forEach(element=>{
        if(element.id.startsWith("aluno"))
            dados_treinamento["alunos"] = dados_alunos_json
        else if(element.name === "formato"){
                console.log(element.name)
                dados_treinamento[element.name] = element.value.toUpperCase()
            } 
        else{
            dados_treinamento[element.name] = element.value
            console.log(element)
        }

    })
    console.log(dadosTreinamento)
    return dados_treinamento
}

function salvarTreinamento(aulas,apostilas,dados_alunos_json){
    const btn_salvar = document.querySelector("#btn_salvar_treinamento")
    btn_salvar.addEventListener("click",()=>{
        let dados_treinamento = retornaDadosTreinamento(aulas,apostilas,dados_alunos_json)
        console.log(dadosTreinamento)
        localStorage.setItem("treinamento",JSON.stringify(dados_treinamento))
        postTreinamento()
    })
}

function salvarAlteracoes(aulas,apostilas,dados_alunos_json,id_treinamento,ids_aulas_deletadas_ou_nao,ids_alunos_deletados_ou_nao,ids_apostilas_deletadas_ou_nao){
    let btn_editar_treinamento = document.querySelector("#btn_editar_treinamento")
    btn_editar_treinamento.addEventListener("click",()=>{
        console.log("salvando alterações...")
        let dados_treinamento = retornaDadosTreinamento(aulas,apostilas,dados_alunos_json)
        console.log(dadosTreinamento)
        localStorage.setItem("treinamento",JSON.stringify(dados_treinamento))
        console.log(id_treinamento)
        putTreinamento(id_treinamento,ids_aulas_deletadas_ou_nao,ids_alunos_deletados_ou_nao,ids_apostilas_deletadas_ou_nao)
    })
}

function escolheAcao(id_treinamento,aulas,apostilas,dados_alunos_json,ids_aulas_deletadas_ou_nao,ids_alunos_deletados_ou_nao,ids_apostilas_deletadas_ou_nao){
    
    if(id_treinamento){
        salvarAlteracoes(aulas,apostilas,dados_alunos_json,id_treinamento,ids_aulas_deletadas_ou_nao,ids_alunos_deletados_ou_nao,ids_apostilas_deletadas_ou_nao)
    }else{
        salvarTreinamento(aulas,apostilas,dados_alunos_json)
    }
}

function guardaAulasBancoDeletadasOuNao(btn,ids_aulas_deletadas_ou_nao){
   let id_aula_banco=  btn.getAttribute("id_aula_banco")
   console.log("oiii")
   console.log(id_aula_banco)
    if(id_aula_banco !== "undefined"){
        ids_aulas_deletadas_ou_nao.ids_aulas_deletadas.push({"id":id_aula_banco})
    }
}

function guardaAlunosBancoDeletadosOuNao(btn,ids_alunos_deletados_ou_nao){
    let id_aluno_banco=  btn.getAttribute("id_aluno_banco")
    console.log("oiii")
    console.log(id_aluno_banco)
     if( id_aluno_banco !== "undefined"){
         ids_alunos_deletados_ou_nao.ids_alunos_deletados.push(parseInt(id_aluno_banco))
     }
}

function guardaApostilasBancoDeletadasOuNao(btn,ids_apostilas_deletadas_ou_nao){
    let id_apostila_banco=  btn.getAttribute("id_apostila_banco")
    console.log("oiii")
    console.log(id_apostila_banco)
     if( id_apostila_banco !== "undefined"){
         ids_apostilas_deletadas_ou_nao.ids_apostilas_deletadas.push({"id":id_apostila_banco})
     }
}


async function exibirPesquisaFuncionarios(tipo_pesquisa,object){

    const query = object.value;

    try {
        let response = null
        if(tipo_pesquisa !== "setor"){
            response = await fetch(`http://localhost:8080/usuario/research/cpf_re_nome?query=${query}`);
        }else{
            response = await fetch(`http://localhost:8080/usuario/setor/${query}`);
        }
        const data = await response.json();
        console.log(data)
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



function returnAlunos(item){
    if(item.tipo === "ALUNO"){
        return `<li>Nome: ${item.nome} - RE: ${item.re} - CPF: ${item.cpf}</li> `
    }
}


carregarDadosHTML()