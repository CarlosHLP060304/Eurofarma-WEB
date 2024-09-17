import { getTreinamento } from "../script_treinamentos/treinamento_service.js";
import { getAlunoById } from "../script_usuarios/aluno_service.js";
import { returnBaseUrl } from "../enviroment/enviroment.js";

export async function criarExcelDetalhamentoAluno(id_aluno) {
    console.log(id_aluno)

    // Função para buscar aluno pelo ID
    let aluno = await getAlunoById(id_aluno);

    // Verifique os dados recebidos para garantir que estão corretos
    console.log(aluno);
    console.log(aluno.re)

    // Envie a requisição para o backend
    fetch(`${returnBaseUrl()}/excel/download/historicoAluno?id=${id_aluno}`, {
        
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'ngrok-skip-browser-warning': 'true'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();  // Converte a resposta em um Blob
    })
    .then(blob => {
        // Cria um URL temporário para o Blob e inicia o download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${aluno.re}_${aluno.nome}.xlsx`;  // Nome do arquivo a ser salvo
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Erro ao baixar o arquivo:', error));
}


export async function criarExcelDetalhamentoTreinamento(id_treinamento) {
    // Função para buscar aluno pelo ID
    let treinamento = await getTreinamento(id_treinamento);

    // Verifique os dados recebidos para garantir que estão corretos
    console.log(treinamento);

    // Envie a requisição para o backend
    fetch(`${returnBaseUrl()}/excel/download/dadosTreinamento?id=${id_treinamento}`, {
        
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'ngrok-skip-browser-warning': 'true'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();  // Converte a resposta em um Blob
    })
    .then(blob => {
        // Cria um URL temporário para o Blob e inicia o download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${treinamento.nome}.xlsx`;  // Nome do arquivo a ser salvo
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Erro ao baixar o arquivo:', error));
}
