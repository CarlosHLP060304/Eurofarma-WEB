import { returnBaseUrl } from "../enviroment/enviroment.js";

document.querySelector("#form").addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(turnstile.getResponse())
    let requestBody = {
        login: document.querySelector("#login").value,
        senha: document.querySelector("#senha").value,
        tokenCloudFlare: turnstile.getResponse()
    };
    
    fazerLogin(requestBody)
})

function fazerLogin(requestBody){
    
    let response =  fetch(`${returnBaseUrl()}/login`,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(requestBody),
    }).then(
        response => response.json()
    ).then(
        data=>{
            localStorage.setItem("token",data.token)
            let token = data.token
            if(token === null || token === undefined)
                console.log("Erro no login")
            else
                window.location.href = "pages/listarTreinamento.html"
        } 
    )
}

