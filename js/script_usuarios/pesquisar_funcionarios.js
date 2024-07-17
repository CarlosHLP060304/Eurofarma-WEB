import { getFuncionarios } from "./aluno_service.js";

getFuncionarios().then(
                    dados=> document.querySelector("tbody").innerHTML =  dados.content.map(
                        dado=>{
                            console.log(dado.tipo==="ALUNO")
                            if(dado.tipo === "ALUNO"){
                            return `  <tr>
                                        <td>${dado.nome}</td>
                                        <td>${dado.cpf}</td>
                                      </tr>` 
                        }
                        
                        }
                ).join("")
            )




