import { criarExcelDetalhamentoAluno } from "../script_excel/excel_service.js";

        
        document.querySelector("#btn_baixar_excel").addEventListener("click",()=>{
                let id_aluno = parseInt(window.location.search.split("id_aluno=")[1])
                console.log(id_aluno)
                criarExcelDetalhamentoAluno(id_aluno)         
        })

        var cells = document.querySelectorAll('#tabela-status td:nth-child(2)');
        
    
        cells.forEach(function(cell) {
    
            var status = cell.textContent.trim();
            
        
            switch(status) {
                case 'Finalizado':
                    cell.classList.add('verde');
                    break;
                case 'Cursando':
                    cell.classList.add('amarelo');
                    break;
                case 'Pendente':
                    cell.classList.add('vermelho');
                    break;
                default:
                    break;
            }
        });