import { Questao } from "../Questao/index.js";

export function PopUpQuestionario({questoes,nomeTreinamento}){
    return `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabel">Questionário do treinamento "${nomeTreinamento}"</h5>
                   <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                <div class="modal-body">
                    <h2 class="text-center mb-4">Visualização do Questionário</h2>
                    ${
                        questoes.map(
                            (questao,index) =>  Questao({titulo:`Questão ${index + 1}`,pergunta:questao.pergunta,alternativas:questao.alternativas,resposta:questao.resposta})
                        ).join("")
                    }
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-danger">Excluir</button>
                </div>
            </div>
        </div>
            `
}
        

