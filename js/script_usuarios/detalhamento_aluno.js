import { criarExcelDetalhamentoAluno } from "../script_excel/excel_service.js";
import { getHistoricoAlunoTreinamentos } from "./aluno_service.js";

let id_aluno = parseInt(window.location.search.split("id_aluno=")[1])
        
document.querySelector("#btn_baixar_excel").addEventListener("click",()=>{
    console.log(id_aluno)
    criarExcelDetalhamentoAluno(id_aluno)         
})

function preencherDadosIniciaisAluno(chave,valor){
    document.querySelector(chave).textContent = valor
}

async function preencherDadosAluno(id_aluno) {
    const dados_aluno = await getHistoricoAlunoTreinamentos(id_aluno)
    console.log(JSON.stringify(dados_aluno))
    preencherDadosIniciaisAluno("#nome_funcionario",dados_aluno.dados_basicos_aluno.nome)
    preencherDadosIniciaisAluno("#re",dados_aluno.dados_basicos_aluno.re)
    preencherDadosIniciaisAluno("#cpf",dados_aluno.dados_basicos_aluno.cpf)
    document.querySelector("#listagem_treinamentos").innerHTML =`
        ${dados_aluno.presencas_aluno.map(
            presenca_aluno => `
                <tr>
                    <th>${presenca_aluno.nome}</th>
                    <th class="${presenca_aluno.aula_concluida ? "verde": "vermelho"}">${presenca_aluno.aula_concluida ? "PRESENTE": "AUSENTE"}</th>
                    <th>${returnDataFormatada(presenca_aluno.data_inicio)}</th>
                </tr>
            `
        ).join("")}
    `
} 


function returnDataFormatada(data_nao_formatada){
    let data = new Date(data_nao_formatada)
    let dia = data.getDate()
    let mes = data.getMonth()
    let ano = data.getFullYear()

    return `${dia}/${mes}/${ano}`
}

preencherDadosAluno(id_aluno)