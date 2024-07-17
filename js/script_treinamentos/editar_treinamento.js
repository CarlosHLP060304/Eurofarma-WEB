import { getAulas } from "../script_aulas/aula_service.js"
import { getFuncionarios } from "../script_usuarios/aluno_service.js"
import { getTreinamento } from "../script_treinamentos/treinamento_service.js"

let id_treinamento = window.location.search.split("=")[1]
console.log(id_treinamento)

getTreinamento(id_treinamento).then(
    data=>{
        console.log(data)
        document.querySelector("#editarTreinamento").innerHTML = `
           <div class="form-group">
                    <label for="nome"><b>Nome do Treinamento:</b></label>
                    <input type="text" id="nome" name="nome" value="${data.nome}">
                </div>

                <div class="form-group">
                    <label for="data_inicio"><b>Data Início:</b></label>
                    <input type="date" id="data_inicio" name="data_inicio" value="${data.dataInicio}"> 
                </div>

                
                <div class="form-group">
                    <label for="data_fim"><b>Data Fim:</b></label>
                    <input type="date" id="data_fim" name="data_fim" value="${data.dataFim}"> 
                </div>

                <div class="form-group">
                    <label for="descricao"><b>Descrição do Treinamento:</b></label>
                    <textarea id="descricao" name="descricao">${data.descricao}</textarea>
                </div>

                <div class="form-group">
                    <label for="formato"><b>Selecione o formato </b></label>
                    
                    <select name="modalidade">
                        <option value="remoto">Remoto</option>
                        <option value="presencial" ${data.formato.toLowerCase()==="presencial"? "selected": ""}>Presencial</option>
                    </select>

                </div>

                <div class="form-group">
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
                    <label for="buscar-aluno"><b>Buscar aluno  por nome ou email</b></label>
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
                    <input type="text" name="professor" value="${data.nomeProfessor}">
                </div>


                    <div class="row my-5">
                        <div class="col-md-12">
                            <h4>Anexar apostilas</h4>
                            <div class="form-group">
                                <input type="text" id="apostila" name="apostila">
                            </div>
                            <ul class="apostilas" id="apostilas">
                                
                            </ul>
                        </div>
                        <button type="button" class="btn btn-success px-4" id="btn_adicionar_apostila" btn_adicionar>Adicionar</button>

                    </div>

`


    }
)

function listarAlunosSelect(){
    getFuncionarios().then(data=>
        document.querySelector("#aluno").innerHTML =data.content.map(
            element=>
                `
                    <option value="${element.cpf}">${element.cpf}-${element.nome}</option>
                ` 
        )
    )
}

function listarAulas() {
    getAulas(id_treinamento).then(
        data=>{
            console.log(data)
            document.querySelector("#lista_aulas").innerHTML = `
                ${data.map(
                    element=>
                        `
                    <li>${element.sala}</li>
                    ` 
                )}
            ` 
        }
    )
}


listarAlunosSelect()


listarAulas()