

export function TreinamentoBody(props){
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
                        <option value="presencial" ${props.formato==="presencial" ? "selected" : ""}>Presencial</option>
                        <option value="remoto" ${props.formato==="remoto" ? "selected" : ""}>Remoto</option>
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
                    <input id="sala" name="sala" value=${props.sala ? props.sala : ""}>
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
                    <input type="text" name="nomeProfessor">
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
    
    
    
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-primary btn-lg" id="btn_salvar" type="button" >Criar Treinamento</button>
                        </div>
                    </div>
    
    
    
            </form>
        </div>
    </div>   
    `
    
}




 


   