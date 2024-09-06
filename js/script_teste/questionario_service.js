export async function postQuestionario(questionario){
    console.log(questionario)
    let response = await fetch("http://localhost:8080/questionario",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body:JSON.stringify(questionario),
        })
   

    console.log(await response.json())
}