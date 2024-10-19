import { returnBaseUrl } from "../enviroment/enviroment.js"
import { carregarNavbar } from "../teste.js"

async function redirecionarParaPaginaDeLogin() {
    let token = localStorage.getItem("token") 
    let id_usuario = localStorage.getItem("idUsuario")
    fetch(`${returnBaseUrl()}/login?token=${token}&idUsuario=${id_usuario}`).then(
        response =>{
            if(window.location.pathname !== "/" && !response.ok){
                window.location.pathname="/"
                localStorage.clear()
            }else{
                return response.json()
                
        }
    }
    ).then(
         data => localStorage.setItem("usuarioLogado",JSON.stringify(data))
    )
}


redirecionarParaPaginaDeLogin().then(
    ()=>{
        carregarNavbar()
    }
)