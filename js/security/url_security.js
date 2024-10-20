import { returnBaseUrl } from "../enviroment/enviroment.js"
import { carregarNavbar } from "../teste.js"

async function redirecionarParaPaginaDeLogin() {
    let token = localStorage.getItem("token") 
    let id_usuario = localStorage.getItem("idUsuario")
    const response = await fetch(`${returnBaseUrl()}/login?token=${token}&idUsuario=${id_usuario}`)
    let data = null
    if(window.location.pathname !== "/" && !response.ok){
                window.location.pathname="/"
                localStorage.clear()
    }else{
        data = await response.json()            
    }
    localStorage.setItem("usuarioLogado",JSON.stringify(data))
    carregarNavbar(data)
}

redirecionarParaPaginaDeLogin()
