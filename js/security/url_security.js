import { returnBaseUrl } from "../enviroment/enviroment"

function redirecionarParaPaginaDeLogin() {
    let token = localStorage.getItem("token") 
    fetch(`${returnBaseUrl()}?token=${token}`).then(
        response =>{
            if(window.location.pathname !== "/" && !response.ok){
                window.location.pathname="/"
            }
        }
    )    
}

redirecionarParaPaginaDeLogin()