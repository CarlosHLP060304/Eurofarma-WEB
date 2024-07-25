import { getFuncionarios } from "./aluno_service.js";

let funcionarios = []

getFuncionarios().then(
                    dados=> document.querySelector("tbody").innerHTML =  dados.content.map(
                        dado=>{
                            funcionarios.push(dado)
                            console.log(dado.tipo==="ALUNO")
                            if(dado.tipo === "ALUNO"){
                            return ` 
                                    <tr id_aluno=${dado.id} class="tr-body">
                                        <td>${dado.nome}</td>
                                        <td>${dado.cpf}</td>
                                      </tr>` 
                        }
                        
                        }
                ).join("")
    ).then(
        ()=> document.querySelectorAll(".tr-body").forEach(
            dado=> dado.addEventListener("click",()=>{
                    window.location.href = `/pages/detalhamentoAluno.html?id_aluno=${dado.getAttribute("id_aluno")}`
                }
            )
        )
    )



