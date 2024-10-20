import { SelectTreinamento } from "../components/SelectTreinamento/index.js"
import { getTreinamentos } from "../script_treinamentos/treinamento_service.js"

//const select_treinamento = document.querySelector("#select_treinamento")
const selectTreinamento = new SelectTreinamento()
const qr_code =  document.querySelector("#qr_code")
const btn_gerar_qrcode = document.querySelector("#btn_gerar_qrcode")

async function exibirTreinamentos(){
    let pageable = await getTreinamentos()
    pageable = await getTreinamentos(0,pageable.totalElements)
    const treinamentos = pageable.content
    selectTreinamento.setTreinamentos(treinamentos)
    selectTreinamento.exibeSelectTreinamento()
}

btn_gerar_qrcode.addEventListener("click",()=>{
    exibirQrCode(selectTreinamento.getValue())
})

function exibirQrCode(treinamento){
    qr_code.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${treinamento}`
}

selectTreinamento.init()
exibirTreinamentos()
