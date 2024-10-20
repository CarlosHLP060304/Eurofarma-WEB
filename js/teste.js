export async function carregarNavbar(usuario){
        const response = await fetch('navbar.html')
        const data = await response.text()
        let navbar = data.replace("{nomeAdministrador}",usuario.nome)
        document.getElementById('navbar-placeholder').innerHTML = navbar;
        deslogarListener()        
}

function deslogarListener() {
    document.querySelector("#deslogar").addEventListener("click",()=>{
        window.location.href = "/"
        localStorage.clear()
    })
}
