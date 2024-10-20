import { calculaDuracaoAula, calculaDuracaoTreinamento, deleteTreinamento, getTreinamentos, getTreinamentosByNome } from "./treinamento_service.js"
import {criarExcelDetalhamentoTreinamento} from "../script_excel/excel_service.js"
import { PaginacaoContainer } from "../components/PaginacaoContainer/index.js"
import { Search } from "../components/Search/index.js"
import { ListagemTreinamento } from "./components/ListagemTreinamentos/index.js"


const searchContainer = new Search({placeholder:"Pesquisar por nome do treinamento",name:"pesquisar_treinamento",id:"pesquisar_treinamento"})
const paginacaoContainerClass = new PaginacaoContainer() 
const paginacaoContainer = document.querySelector("#paginacaoContainer")

function exibirListagemTreinamentos(page) {
    getTreinamentos(page,10).then(
        dados=> document.querySelector("tbody").innerHTML =  dados.content.map(
            dado=>{
                console.log(dado)
                if(dado.ativo == true){
                    return ListagemTreinamento(dado)
                }
            }

        ).join(" ")
    ).then(deletarItensLista)
}

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



paginacaoContainer.innerHTML = paginacaoContainerClass.returnComponente()
paginacaoContainerClass.init(exibirListagemTreinamentos)
searchContainer.exibirSearch()
document.querySelector("#pesquisar_treinamento").addEventListener("input",async(e)=>{
    let treinamentos = await getTreinamentosByNome(e.target.value) 
    document.querySelector("tbody").innerHTML = treinamentos.map(
        dado=>{
            if(dado.ativo == true){
                return ListagemTreinamento(dado)
            }
        }

    ).join(" ")
})
exibirListagemTreinamentos()