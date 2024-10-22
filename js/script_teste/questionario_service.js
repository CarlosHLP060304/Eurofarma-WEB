import { returnBaseUrl } from "../enviroment/enviroment.js";

export async function postQuestionario(questionario){
    
    let response = await fetch(`${returnBaseUrl()}/questionario`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'ngrok-skip-browser-warning': 'true'
            },
            body:JSON.stringify(questionario),
        })
    
}


export async function getQuestionario(idTreinamento) {
    return (await fetch(`${returnBaseUrl()}/questionario/${idTreinamento}`)).json()
}

