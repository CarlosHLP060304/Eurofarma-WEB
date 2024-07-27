import { postTreinamento, putTreinamento } from "./treinamento_service.js"
import { getTreinamento } from "../script_treinamentos/treinamento_service.js"
import { exibirAlunos, exibirApostilas, exibirAulas, listarAlunosSelect, TreinamentoBody } from "./template_treinamento.js"
import { getAulas } from "../script_aulas/aula_service.js"
import { getApostilas } from "../script_apostilas/apostila_service.js"
import { getAlunosByTreinamento, getFuncionarios } from "../script_usuarios/aluno_service.js"

let id_treinamento = window.location.search.split("=")[1]
console.log(id_treinamento)

let dadosTreinamento = {}




if(id_treinamento){
    getTreinamento(id_treinamento).then(
        dados_treinamento=> dadosTreinamento = dados_treinamento
    ).
    then(
       ()=>
        getAulas(id_treinamento).then(
            dados_aulas => dadosTreinamento["aulas"] = dados_aulas
        )
    ).then(
        ()=> getApostilas(id_treinamento).then(
            dados_apostilas => dadosTreinamento["apostilas"] = dados_apostilas
        )
    ).
    then(
        ()=> getAlunosByTreinamento(id_treinamento).then(
            dados_aluno => dadosTreinamento["alunos"] = dados_aluno
        )
    )
    .
    then(
        ()=> {
            console.log(dadosTreinamento)
            document.querySelector("#template").innerHTML = TreinamentoBody(dadosTreinamento,id_treinamento)
        }
    ).then(
        ()=>carregarElementosDinamicos(dadosTreinamento)
        
    )
}else{
    dadosTreinamento["formato"] = ""
    dadosTreinamento["aulas"] = []
    document.querySelector("#template").innerHTML = TreinamentoBody(dadosTreinamento,id_treinamento)
    carregarElementosDinamicos(dadosTreinamento)
}

function carregarElementosDinamicos(dadosTreinamento){
    const pop_up_aula= document.querySelector("#pop_up_aula")
    const modalidade = document.querySelector("[name='formato']")
    const conteudo_pop_up =  document.querySelector("#conteudo-pop-up")
    const apostilas_html = document.querySelector("#apostilas")
    const alunos_html = document.querySelector("#alunos-lista")
    const aulas_html = document.querySelector("#lista_aulas")
    const sessao_aulas =document.querySelector("#aulas")
    const sala = document.querySelector("#div_sala")
    let btns_adicionar= document.querySelectorAll("[btn_adicionar]") 
    let dados_aluno = {}
    let dados_alunos_json = []
    let dados_apostila = ""
    let aulas = dadosTreinamento.aulas ? dadosTreinamento.aulas : []
    let apostilas = dadosTreinamento.apostilas ? retornaListaLinksApostila(dadosTreinamento.apostilas) : []
    let alunos = dadosTreinamento.alunos ? retornaListaUsuariosTreinamento(dadosTreinamento.alunos) : []
    
    console.log(dadosTreinamento)
    
    modalidade.addEventListener("change",()=>{
        trocarDeFormatoDeTreinamento(modalidade,sessao_aulas,sala)
    })

    trocarDeFormatoDeTreinamento(modalidade,sessao_aulas,sala)
    
    btns_adicionar.forEach(
        btn_adicionar=>{
            btn_adicionar.addEventListener("click",()=>{
                if(btn_adicionar.id.endsWith("apostila")){
                    dados_apostila = document.querySelector('#apostila').value
                    apostilas.push(dados_apostila)
                    exibirApostilas(apostilas_html,apostilas)
    
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
                    exibirAulas(modalidade,aulas_html,aulas)
                }else{
                    dados_aluno = document.querySelector('#aluno').value
                    let dados_aluno_json = {
                        "id":dados_aluno.split("-")[0]
                    }
                    let dados_aluno_exibicao = `${dados_aluno.split("-")[1]}  - ${dados_aluno.split("-")[2]}-${dados_aluno.split("-")[3]}`
                    console.log(dados_aluno.split("-"))
                    dados_alunos_json.push(dados_aluno_json)
                    alunos.push(dados_aluno_exibicao)
                    exibirAlunos(alunos_html,alunos)
                }
                
               removerElementosDasListas(alunos,aulas,apostilas,alunos_html,aulas_html,apostilas_html,modalidade)
            })
        }
    )
    
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
    exibirApostilas(apostilas_html,apostilas)
    exibirAlunos(alunos_html,alunos)
    exibirAulas(modalidade,aulas_html,aulas)
    escolheAcao(id_treinamento,aulas,apostilas,dados_alunos_json)
}

function removerElementosDasListas(alunos,aulas,apostilas,alunos_html,aulas_html,apostilas_html,modalidade){
    document.querySelectorAll(".remove-btn").forEach(
        btn=>{
            btn.addEventListener("click",()=>{
                console.log("chamou")
                
                if(btn.hasAttribute("id_aluno")){
                    alunos.splice(btn.getAttribute("id_aluno"),1)
                    exibirAlunos(alunos_html,alunos)
                }
                else if(btn.hasAttribute("id_aula")){
                    aulas.splice(btn.getAttribute("id_aula"),1)
                    exibirAulas(modalidade,aulas_html,aulas)
                }
                else if(btn.hasAttribute("id_apostila")){
                    apostilas.splice(btn.getAttribute("id_apostila"),1)
                    exibirApostilas(apostilas_html,apostilas)
                }
                removerElementosDasListas(alunos,aulas,apostilas,alunos_html,aulas_html,apostilas_html,modalidade)
            })
        }
    )    
    
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


function retornaListaLinksApostila(apostilas){
    let links = []
    apostilas.forEach(apostila => {
        links.push(apostila.link)
    });
    return links
}

function retornaListaUsuariosTreinamento(alunos){
    let alunos_treinamento = []
    alunos.forEach(aluno => {
        alunos_treinamento.push(`${aluno.nome} - ${aluno.cpf}`)
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

function salvarAlteracoes(aulas,apostilas,dados_alunos_json){
    let btn_editar_treinamento = document.querySelector("#btn_editar_treinamento")
    btn_editar_treinamento.addEventListener("click",()=>{
        console.log("salvando alterações...")
        putTreinamento()
    })
}

function escolheAcao(id_treinamento,aulas,apostilas,dados_alunos_json){
    
    if(id_treinamento){
        salvarAlteracoes(aulas,apostilas,dados_alunos_json)
    }else{
        salvarTreinamento(aulas,apostilas,dados_alunos_json)
    }
}

