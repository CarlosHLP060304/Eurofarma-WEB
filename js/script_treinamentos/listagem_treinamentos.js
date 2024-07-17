import { deleteTreinamento, getTreinamentos } from "./treinamento_service.js"


getTreinamentos().then(
                    dados=> document.querySelector("tbody").innerHTML =  dados.content.map(
                        dado=>{
                            if(dado.ativo == true){
                               return  `  <tr>
                                <td>${dado.nome}</td>
                                <td>${dado.id}horas</td>
                                <td>${dado.descricao}</td>
                                <td>${dado.formato}</td>
                                <td>
                                    <a href="../pages/editarTreinamento.html?id_treinamento=${dado.id}"><button class="btn btn-primary-dark btn-sm">Editar</button></a>
                                    <button class="btn btn-danger-dark btn-sm btn-excluir" id=${dado.id}>Excluir</button></a>
                                </td>
                                </tr>` 
                            }
                        }

                    ).join(" ")
                ).then(deletarItensLista)

function deletarItensLista() {
        console.log(document.querySelectorAll(".btn-excluir"))
        document.querySelectorAll(".btn-excluir").forEach(
            btn=>
                btn.addEventListener("click",()=>{ 
                console.log(btn.id)
                deleteTreinamento(btn.id)
                window.location.href="/pages/listarTreinamento.html"
            })
        )
}


