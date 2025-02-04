import { getFuncionarios } from "./aluno_service.js";
import {returnBaseUrl} from "../enviroment/enviroment.js"
import { PaginacaoContainer } from "../components/PaginacaoContainer/index.js";

let funcionarios = []
const paginacaoContainerClass = new PaginacaoContainer() 
const paginacaoContainer = document.querySelector("#paginacaoContainer")

function exibirFuncionarios(page) {
    getFuncionarios(page,10).then(
                        dados=> document.querySelector("tbody").innerHTML =  dados.content.map(
                            dado=>{;
                                funcionarios.push(dado)
                                
                                return returnAlunos(dado)
                            }
                    ).join("")
    )
}


document.addEventListener("click",(e)=>{
    const linha_funcionario_selecionada =  e.target.closest(".tr-body")
    if(linha_funcionario_selecionada.classList.contains("tr-body")){
        window.location.href = `/pages/detalhamentoAluno.html?id_aluno=${linha_funcionario_selecionada.getAttribute("id_aluno")}`    
    }
})

document.getElementById("pesquisa_funcionario").addEventListener("input", async function() {
    const query = this.value;

    try {
        const response = await fetch(`${returnBaseUrl()}/usuario/research?query=${query}`,{
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
        const data = await response.json();

        const list = document.querySelector("tbody");
        list.innerHTML = `
            ${data.map(item => {
                return returnAlunos(item)
            }).join(" ")
            }
        `

    } catch (error) {
        console.error('Erro ao buscar as sugestões:', error);
    }
});


function returnAlunos(item){
    if(item.tipo === "ALUNO"){
        return `
        <tr id_aluno=${item.id} class="tr-body">
            <td>${item.nome}</td>
            <td>${item.re}</td>
            <td>${item.setor}</td>
        </tr>`
    }
}

paginacaoContainer.innerHTML = paginacaoContainerClass.returnComponente()
paginacaoContainerClass.init(exibirFuncionarios)
exibirFuncionarios()