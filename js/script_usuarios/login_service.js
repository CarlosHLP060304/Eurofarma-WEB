import { returnBaseUrl } from "../enviroment/enviroment.js";

document.querySelector("#form").addEventListener("submit",(e)=>{
    e.preventDefault()
    let requestBody = {
        login: document.querySelector("#login").value,
        senha: document.querySelector("#senha").value
    };
    console.log(login)
    fazerLogin(requestBody)
})

function fazerLogin(requestBody){
    
    let response =  fetch(`${returnBaseUrl()}/login`,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
    }).then(
        response => response.json()
    ).then(
        data=>{
            localStorage.setItem("token",data.token)
            let token = data.token
            if(token === null || token === undefined)
                window.location.href = "/"
            else
                window.location.href = "pages/listarTreinamento.html"
        } 
    )
}

