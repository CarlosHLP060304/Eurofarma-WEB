export function getApostilas(id) {
    console.log(`http://localhost:8080/apostila/treinamento/5`)
    let response = fetch(`http://localhost:8080/apostila/treinamento/${id}`,{
        method:"GET"
    }).then(
        response=>response.json()
    )
    return response
}

export function postApostilas(apostilas,treinamento_id){
    console.log(apostilas)
    apostilas.forEach(apostila => {
        console.log(apostila)
        let apostila_json = {
            "link": apostila,
            "treinamento":{
                "id":treinamento_id
            }
        } 
        fetch("http://localhost:8080/apostila",{
            method: "POST",
            headers:
                {   'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            body: JSON.stringify(apostila_json)
        })
    });
    
}