import { getFuncionarios } from "../script_usuarios/aluno_service.js"

export function TreinamentoBody(props,id_treinamento){
    return `
   

    <div class="container">
        <div class="login-box">
            <form class="p-5">
    
                <div class="form-group">
                    <label for="nome"><b>Nome do Treinamento:</b></label>
                    <input type="text" id="nome" name="nome" value=${props.nome ? props.nome : ""}>
                </div>
                <div class="form-group">
                    <label for="formato"><b>Selecione o formato </b></label>
                    
                    <select name="formato">
                        <option value="presencial" ${props.formato.toLowerCase()==="presencial" ? "selected" : ""}>Presencial</option>
                        <option value="online" ${props.formato.toLowerCase()==="online" ? "selected" : ""}>Remoto</option>
                    </select>
    
                </div>
    
                <div class="form-group">
                    <label for="data_inicio"><b>Data Início:</b></label>
                    <input type="datetime-local" id="dataInicio" name="dataInicio" value=${props.dataInicio ? props.dataInicio : ""}> 
                </div>
    
                
                <div class="form-group">
                    <label for="data_fim"><b>Data Fim:</b></label>
                    <input type="datetime-local" id="dataFim" name="dataFim" value=${props.dataFim ? props.dataFim : ""}> 
                </div>
    
                <div class="form-group">
                    <label for="descricao"><b>Descrição do Treinamento:</b></label>
                    <textarea id="descricao" name="descricao">${props.descricao ? props.descricao : ""}</textarea>
                </div>
    
                <div class="form-group" id="div_sala">
                    <label for="sala"><b>Local/Sala:</b></label>
                    <input id="sala" name="sala" value=${props.aulas.length===1 && props.formato.toLowerCase() === "presencial" ? props.aulas[0].sala : ""}>
                </div>
                
    
                <div class="form-group d-none" id="aulas">
                    <label><b>Aulas</b></label>
                    <ul id="lista_aulas">
                        
                    </ul>
                    <button type="button" class="btn btn-success px-4" id="btn_adicionar_aula">Adicionar</button>
                </div>
    
                <div class="pop-up-aula d-none" id="pop_up_aula">
                    <button type="button" id="btn_fechar_pop_up" class="btn d-flex justify-content-end " style="width: 100%"><span>❌</span></button>
                    <h2>Adicionar Aula</h2>
                    <div class="conteudo-pop-up" id="conteudo-pop-up"></div>
                    <button type="button" class="btn btn-success px-4 mb-2" id="btn_pop_up_adicionar_aula" btn_adicionar>Adicionar</button>
                </div>
    
                <div class="form-group">
                    <label for="buscar-aluno"><b>Buscar aluno por nome ou email</b></label>
                    <select name="buscar-aluno" id="aluno" name="aluno">
                        
                    </select>
                    <blockquote>apos buscar, clique sobre o aluno e aperte em "adicionar"</blockquote>
    
                </div>
    
                <!-- lista de aluno  -->
                <div class="form-group">
                    <ul id="alunos-lista">
                      
                    </ul>
    
                    <div class=" text-center">
                        <button type="button" class="btn btn-success px-4" id="btn_adicionar_aluno" btn_adicionar>Adicionar</button>
                    </div>
                </div>
    
                <!-- fim da lista de alunos -->
    
    
                <!-- lista de professor  -->
                <div class="form-group">
                    <label for="buscar-professor"><b>Insira o nome do professor </b></label>
                    <input type="text" name="nomeProfessor" value=${props.nomeProfessor? props.nomeProfessor : ""}>
                </div>
    
    
                    <div class="row my-5">
                        <div class="col-md-12">
                            <label for="">
                                <b>Anexar apostilas</b>
                            </label>
                            <div class="form-group">
                                <input type="text" id="apostila" name="apostila">
                            </div>
                            <ul class="apostilas" id="apostilas">
                                
                            </ul>
                        </div>
                        <button type="button" class="btn btn-success px-4" id="btn_adicionar_apostila" btn_adicionar>Adicionar</button>
    
                    </div>
    
    
                    ${retornabotaoForm(id_treinamento)}
    
    
    
            </form>
        </div>
    </div>   
    `
    
}

export function exibirAlunos(alunos){
    const alunos_html = document.querySelector("#alunos-lista")

    let id = 0
    alunos_html.innerHTML = alunos.map((aluno)=>
        `<li>${aluno.exibicao}<span class="remove-btn" id_aluno=${id++} id_aluno_banco=${aluno.id}>❌</span></li>` 
    ).join("")
    //console.log(alunos_html)
}

export function exibirApostilas(apostilas){
    const apostilas_html = document.querySelector("#apostilas")
    let id = 0
        
            apostilas_html.innerHTML =  apostilas.map((apostila)=>

                `<li><a href=${apostila} target="_blank">${apostila.link}</a><span class="remove-btn" id_apostila=${id++} id_apostila_banco=${apostila.id}>❌</span></li>` 
            ).join("")
        
    

    //console.log(apostilas)
    //console.log(apostilas_html)
}

export function exibirAulas(modalidade,aulas){
    const aulas_html = document.querySelector("#lista_aulas")
    let id = 0
    console.log(modalidade.value)
    if(modalidade.value.toLowerCase() === "online"){
        aulas_html.innerHTML = aulas.map((aula)=>
            
            `
                <li>Aula:${aula.nome}  / Link para aula: <a href=${aula.link} target="_blank">${aula.link}</a> / Duração:${aula.duracao} min<span class="remove-btn" id_aula=${id++} id_aula_banco=${aula.id}>❌</span></li>
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

export function listarAlunosSelect(){
        getFuncionarios().then(data=>
            document.querySelector("#aluno").innerHTML = data.content.map(
                element=>{
                    if(element.tipo === "ALUNO"){
                        return `
                           <option value="${element.id}-${element.nome}-${element.cpf}">${element.nome}-${element.cpf}</option>
                        ` 
                    }

                }
            )
        )
}

function retornabotaoForm(id_treinamento){
    console.log(id_treinamento)
    if (id_treinamento) {
        return `
              <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-warning btn-lg" id="btn_editar_treinamento" type="button" >Salvar Alterações</button>
                        </div>
                    </div>
        `
    } 
    return   `<div class="row">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-primary btn-lg" id="btn_salvar_treinamento" type="button" >Criar Treinamento</button>
                        </div>
                    </div>`
}



   