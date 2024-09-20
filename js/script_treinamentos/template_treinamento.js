import { getFuncionarios, getSetoresAlunos } from "../script_usuarios/aluno_service.js"

export function TreinamentoBody(props,id_treinamento){
    return `
   

    <div class="container">
        <div class="login-box">
            <form class="p-5">
    
                <div class="form-group">
                    <label for="nome"><b>Nome do Treinamento:</b></label>
                    <input type="text" id="nome" name="nome" value="${props.nome ? props.nome : ""}" dado_treinamento>
                </div>

                <div class="form-group">
                    <label for="descricao"><b>Descrição do Treinamento:</b></label>
                    <textarea id="descricao" name="descricao" dado_treinamento>${props.descricao ? props.descricao : ""}</textarea>
                </div>

                <div class="d-flex justify-content-between py-2" >
                    <div class="form-group d-flex align-items-center" style="width:40%">
                        <label class="mb-0" for="data_inicio" style="width:50%"><b>Data Início:</b></label>
                        <input type="datetime-local" id="dataInicio"  class="p-2" name="dataInicio" value="${props.dataInicio ? props.dataInicio : ""}" dado_treinamento> 
                    </div>
                    <div class="form-group d-flex justify-content-around align-items-center" style="width:40%">
                        <label for="data_fim" class="mb-0"  style="width:50%"><b>Data Fim:</b></label>
                        <input type="datetime-local" id="dataFim"  class="p-2"  name="dataFim" value="${props.dataFim ? props.dataFim : ""}" dado_treinamento> 
                    </div>                
                </div>

                <fieldset id="selecionar_funcionarios" class="py-4">
                    <label><b>Selecionar funcionários</b></label>
                  
                    <div class="d-flex">
                        <select class="mr-2" style="border-radius: 5px;" id="select_tipo_pesquisa">
                            <option value="setor">Setor</option>
                            <option value="individual">Individualmente (CPF, RE ou Nome)</option>
                        </select>
                        <div id="pesquisa_selecionada" style="width:100%">
                            
                        </div>
                    </div>

                    <ul id="lista_pesquisa">
                        
                    </ul>
                </fieldset>

                <!-- lista de aluno  -->
                <div class="form-group">
                    <ul id="alunos-lista">

                    </ul>
    
                    <div class=" text-center">
                        <button type="button" class="btn btn-success px-4" id="btn_adicionar_aluno" btn_adicionar>Adicionar</button>
                    </div>
                </div>
    
                <!-- fim da lista de alunos -->
    
                <div class="form-group" id="div_sala">
                    <label for="sala"><b>Local/Sala:</b></label>
                    <input id="sala" name="sala" value="${props.aulas.length===1 ? props.aulas[0].sala : ""}" dado_treinamento>
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
    
    
                <!-- lista de professor  -->
                <div class="form-group">
                    <label for="buscar-professor"><b>Insira o nome do professor </b></label>
                    <input type="text" name="nomeProfessor" value="${props.nomeProfessor? props.nomeProfessor : ""}" dado_treinamento>
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

export function exibirAlunos(funcionarios){
    const alunos_html = document.querySelector("#alunos-lista")
    alunos_html.innerHTML =`
        ${
            Array.from(funcionarios).map(
                (funcionario,index) => {
                    if(funcionario.tipo === "ALUNO")
                        return `<li>Nome: ${funcionario.nome} - RE: ${funcionario.re} - CPF: ${funcionario.cpf}<span id_aluno_banco="${funcionario.id}" id_aluno="${index}" class="remove-btn">❌</span></li>`
                }
            ).join("")
        }
    `
     

}

export function exibirApostilas(apostilas){
    const apostilas_html = document.querySelector("#apostilas")
    let id = 0
        
            apostilas_html.innerHTML =  apostilas.map((apostila)=>

                `<li><a href="${apostila.link}" target="_blank">${apostila.link}</a><span class="remove-btn" id_apostila=${id++} id_apostila_banco=${apostila.id}>❌</span></li>` 
            ).join("")
        
    

    //
    //
}

export function returnMetodoDePesquisa(tipoPesquisa){
    
    if(tipoPesquisa === "setor"){
        return `<select class="p-2" id="aluno_setor" name="setor" >
                    
            </select>
            `           
    }else{
        return `
            <div class="d-flex justify-content-center align-items-center div-search-funcionario">
                <input type="search" name="pesquisa_funcionario" id="pesquisa_funcionario" class="search-funcionario p-2"  style="width: 100%;">
                <button type="button" class="btn" id="btn_pesquisa_funcionario">🔎</button>
            </div>
        `
    }
}


export function exibirAulas(modalidade,aulas){
    const aulas_html = document.querySelector("#lista_aulas")
    let id = 0
    
        aulas_html.innerHTML = aulas.map((aula)=>
            
            `
                <li>Aula:${aula.nome}  /  Duração:${aula.duracao} min  /  Sala:${aula.sala} / Hora de Início:${aula.hora_inicio} <span class="remove-btn" id_aula=${id++}>❌</span></li>
                </br>
            ` 
        ).join("")
    //
    //
}


export function exibirSelectSetores(){
    getSetoresAlunos().then(data=>document.querySelector("#aluno_setor").innerHTML =`
       <option value="">Selecionar setor</option>
       ${ 
            data.map(
                (setor)=>`<option value="${setor}">${setor}</option>`
            )
        
    }
    `)
}

function retornabotaoForm(id_treinamento){
    
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

