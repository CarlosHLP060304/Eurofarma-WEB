import { getFuncionarios } from "../script_usuarios/aluno_service.js"
import { postTreinamento } from "./treinamento_service.js"

const pop_up_aula= document.querySelector("#pop_up_aula")
const btn_salvar = document.querySelector("#btn_salvar")
const modalidade = document.querySelector("[name='modalidade']")
const conteudo_pop_up =  document.querySelector("#conteudo-pop-up")
const apostilas_html = document.querySelector("#apostilas")
const alunos_html = document.querySelector("#alunos-lista")
const aulas_html = document.querySelector("#lista_aulas")
const sessao_aulas =document.querySelector("#aulas")
const sala = document.querySelector("#div_sala")
let dados_input_treinamento = document.querySelectorAll("input")
let dados_select_treinamento = document.querySelectorAll("select")
let dados_text_area_treinamento = document.querySelectorAll("textarea")
let dados_treinamento = {}
let btns_adicionar= document.querySelectorAll("[btn_adicionar]") 
let dados_aluno = {}
let dados_apostila = ""
let aulas = []
let apostilas = []
let alunos = []

modalidade.addEventListener("change",()=>{
    if(modalidade.value === "presencial"){
        sessao_aulas.classList.add("d-none")  
        sala.classList.remove("d-none")
    }
    else{
        sessao_aulas.classList.remove("d-none")
        sala.classList.add("d-none")
    }

})

btns_adicionar.forEach(
    btn_adicionar=>{
        btn_adicionar.addEventListener("click",()=>{
            if(btn_adicionar.id.endsWith("apostila")){
                dados_apostila = document.querySelector('#apostila').value
                apostilas.push(dados_apostila)
                exibirApostilas()

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
                exibirAulas()
            }else{
                dados_aluno = document.querySelector('#aluno').value
                alunos.push(dados_aluno)
                exibirAlunos()
            }
            
           removerElementosDasListas()
        })
    }
)

btn_salvar.addEventListener("click",()=>{
    dados_input_treinamento.forEach(element => { 
        dados_treinamento["aulas"] = aulas
        if(element.id.startsWith("apostila"))
            dados_treinamento["apostilas"] = apostilas
        else
            dados_treinamento[element.name] = element.value

    });
    
    dados_text_area_treinamento.forEach(element=>{
        dados_treinamento[element.name] = element.value
    })
    
    dados_select_treinamento.forEach(element=>{
        if(element.id.startsWith("aluno"))
            dados_treinamento["alunos"] = alunos
        else
            dados_treinamento[element.name] = element.value

    })
    localStorage.setItem("treinamento",JSON.stringify(dados_treinamento))
    console.log(JSON.parse(localStorage.getItem("treinamento")))
    postTreinamento()
})

document.querySelector("#btn_adicionar_aula").addEventListener("click",()=>{
        pop_up_aula.classList.toggle("d-none")
        if(modalidade.value === "remoto"){
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

function removerElementosDasListas(){
    document.querySelectorAll(".remove-btn").forEach(
        btn=>{
            btn.addEventListener("click",()=>{
                console.log("chamou")
                
                if(btn.hasAttribute("id_aluno")){
                    alunos.splice(btn.getAttribute("id_aluno"),1)
                    exibirAlunos()
                }
                else if(btn.hasAttribute("id_aula")){
                    aulas.splice(btn.getAttribute("id_aula"),1)
                    exibirAulas()
                }
                else if(btn.hasAttribute("id_apostila")){
                    apostilas.splice(btn.getAttribute("id_apostila"),1)
                    exibirApostilas()
                }
                removerElementosDasListas()
            })
        }
    )    
    
}

function exibirAlunos(){
    let id = 0
    alunos_html.innerHTML = alunos.map((aluno)=>
        `<li>${aluno}<span class="remove-btn" id_aluno=${id++}>❌</span></li>` 
    ).join("")
    //console.log(alunos_html)
}

function exibirApostilas(){
    let id = 0
    apostilas_html.innerHTML =  apostilas.map((apostila)=>
        `<li><a href=${apostila} target="_blank">${apostila}</a><span class="remove-btn" id_apostila=${id++}>❌</span></li>` 
    ).join("")
    //console.log(apostilas)
    //console.log(apostilas_html)
}

function exibirAulas(){
    let id = 0
    if(modalidade.value === "remoto"){
        aulas_html.innerHTML = aulas.map((aula)=>
            
            `
                <li>Aula:${aula.nome}  / Link para aula: <a href=${aula.link} target="_blank">${aula.link}</a> / Duração:${aula.duracao} min<span class="remove-btn" id_aula=${id++}>❌</span></li>
                </br>
            ` 
        ).join("")
    }else{
        aulas_html.innerHTML = aulas.map((aula)=>
            
            `
                <li>Aula:${aula.nome}  /  Duração:${aula.duracao} min  /  Sala:${aula.sala} / Hora de Início:${aula.hora_inicio} <span class="remove-btn" id_aula=${id++}>❌</span></li>
                </br>
            ` 
        ).join("")
    }
    //console.log(aulas_html)
    //console.log(aulas)
}

function listarAlunosSelect(){
        getFuncionarios().then(data=>
            document.querySelector("#aluno").innerHTML = data.content.map(
                element=>
                    `
                        <option value="${element.cpf}-${element.nome}">${element.cpf}-${element.nome}</option>
                    ` 
            )
        )
}

listarAlunosSelect()



