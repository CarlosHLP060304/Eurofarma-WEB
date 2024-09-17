import { getTreinamentos } from "../script_treinamentos/treinamento_service.js"

const select_treinamento = document.querySelector("#select_treinamento")
const qr_code =  document.querySelector("#qr_code")
const btn_gerar_qrcode = document.querySelector("#btn_gerar_qrcode")

async function exibirTreinamentos(){
    const pageable = await getTreinamentos()
    const treinamentos = pageable.content
    
    select_treinamento.innerHTML = `
        ${treinamentos.map(
            treinamento => {
            if(treinamento.ativo == true){
               return `
                <option value=${treinamento.id}>${treinamento.nome}</option>
            `
            }}
               
        )}
    `
}

btn_gerar_qrcode.addEventListener("click",()=>{
    exibirQrCode(select_treinamento.value)
})

function exibirQrCode(treinamento){
    qr_code.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${treinamento}`
}


exibirTreinamentos()

