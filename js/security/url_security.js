function redirecionarParaPaginaDeLogin() {
    let token = localStorage.getItem("token") 
    fetch(`http://localhost:8080/login?token=${token}`).then(
        response =>{
            if(window.location.pathname !== "/" && !response.ok){
                window.location.pathname="/"
            }
        }
    )    
}

redirecionarParaPaginaDeLogin()