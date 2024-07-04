const pop_up_aula= document.querySelector("#pop_up_aula")
const btn_salvar = document.querySelector("#btn_salvar")
let dados_input_treinamento = document.querySelectorAll("input")
let dados_text_area_treinamento = document.querySelectorAll("textarea")
let dados_select_treinamento = document.querySelectorAll("select")
let btns_adicionar= document.querySelectorAll("[btn_adicionar]") 
const apostilas_html = document.querySelector("#apostilas")
const alunos_html = document.querySelector("#alunos-lista")
const aulas_html = document.querySelector("#lista_aulas")
let dados_treinamento = {}
let dados_aula = {}
let dados_aluno = {}
let dados_apostila = ""
let aulas = []
let apostilas = []
let alunos = []


btns_adicionar.forEach(
    btn_adicionar=>{
        btn_adicionar.addEventListener("click",()=>{
            if(btn_adicionar.id.endsWith("apostila")){
                dados_apostila = document.querySelector('#apostila').value
                apostilas.push(dados_apostila)
                exibirApostilas()

            }else if(btn_adicionar.id.endsWith("aula")){
                dados_aula["hora_inicio"] = document.querySelector("#aula_hora_inicio").value
                dados_aula["hora_fim"] = document.querySelector("#aula_hora_fim").value
                dados_aula["sala"] = document.querySelector("#aula_sala").value
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
        if(element.id.startsWith("aula_"))
            dados_treinamento["aulas"] = aulas
        else if(element.id.startsWith("apostila"))
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
    
    
    console.log(dados_treinamento)
})



localStorage.setItem("treinamento",dados_treinamento)


document.querySelector("#btn_adicionar_aula").addEventListener("click",()=>{
    pop_up_aula.classList.toggle("d-none")
})

document.querySelector("#btn_pop_up_adicionar_aula").addEventListener("click",()=>{
    pop_up_aula.classList.toggle("d-none")
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
    console.log(alunos_html)
}

function exibirApostilas(){
    let id = 0
    apostilas_html.innerHTML =  apostilas.map((apostila)=>
        `<li>${apostila}<span class="remove-btn" id_apostila=${id++}>❌</span></li>` 
    ).join("")
    console.log(apostilas)
    console.log(apostilas_html)
}

function exibirAulas(){
    let id = 0
    aulas_html.innerHTML = aulas.map((aula)=>
        `
            <li>{nome da aula????}<span class="remove-btn" id_aula=${id++}>❌</span></li>
            </br>
        ` 
    ).join("")
    console.log(aulas_html)
}

