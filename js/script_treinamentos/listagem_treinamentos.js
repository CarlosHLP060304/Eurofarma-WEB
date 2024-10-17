import { calculaDuracaoAula, calculaDuracaoTreinamento, deleteTreinamento, getTreinamentos } from "./treinamento_service.js"
import {criarExcelDetalhamentoTreinamento} from "../script_excel/excel_service.js"

getTreinamentos().then(
                    dados=> document.querySelector("tbody").innerHTML =  dados.content.map(
                        dado=>{
                            
                            if(dado.ativo == true){
                               return  ` 
                             <tr>
                                <td>
                                    <div class="d-flex justify-content-center" >
                                        ${dado.nome}
                                    </div>
                                </td>
                                <td>
                                <div class="d-flex justify-content-center" >
                                        ${calculaDuracaoTreinamento(dado)} min
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center" >
                                        ${dado.descricao}
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex px-2 justify-content-center">
                                        <a href="../pages/treinamento.html?id_treinamento=${dado.id}" class="btn btn-primary-dark btn-sm"><button class="btn btn-primary-dark btn-sm">Editar</button></a>
                                        <button class="btn btn-danger-dark btn-sm btn-excluir mx-2" id=${dado.id}>Excluir</button>
                                        <button type="button" class="btn btn-secondary btn-sm d-flex align-items-center justify-content-center" id="btn_baixar_excel_${dado.id}" style="background-color: #217346;">
                                            <span class="mr-2">Excel</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                                            </svg>
                                        </button>   
                                    </div>             
                                </td>
                                </tr>` 
                            }
                        }

                    ).join(" ")
                ).then(deletarItensLista)

function deletarItensLista() {
        
        document.querySelectorAll(".btn-excluir").forEach(
            btn=>
                btn.addEventListener("click",()=>{ 
                
                deleteTreinamento(btn.id)
                window.location.href="/pages/listarTreinamento.html"
            })
        )
}

document.addEventListener("click",(e)=>{
        // Verifica se o elemento clicado ou um de seus ancestrais é um botão com o id que começa com "btn_baixar_excel_"
        const button = e.target.closest("button[id^='btn_baixar_excel_']");
        if (button) {
            let id_treinamento = button.id.split("btn_baixar_excel_")[1];
            criarExcelDetalhamentoTreinamento(id_treinamento);
        }
})


