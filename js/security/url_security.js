import { returnBaseUrl } from "../enviroment/enviroment.js"

function redirecionarParaPaginaDeLogin() {
    let token = localStorage.getItem("token") 
    fetch(`${returnBaseUrl()}/usuario?token=${token}`).then(
        response =>{
            if(window.location.pathname !== "/" && !response.ok){
                window.location.pathname="/"
            }
        }
    )    
}

redirecionarParaPaginaDeLogin()