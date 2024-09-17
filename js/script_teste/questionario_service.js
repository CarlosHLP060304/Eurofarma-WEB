import { returnBaseUrl } from "../enviroment/enviroment.js";

export async function postQuestionario(questionario){
    console.log(questionario)
    let response = await fetch(`${returnBaseUrl()}/questionario`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body:JSON.stringify(questionario),
        })
   

    console.log(await response.json())
}