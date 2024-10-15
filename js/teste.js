 document.addEventListener("DOMContentLoaded", function() {
            fetch('navbar.html')
                .then(response => response.text())
                .then(data => {
                    let navbar = data.replace("{nomeAdministrador}",JSON.parse(localStorage.getItem("usuarioLogado")).nome)
                    document.getElementById('navbar-placeholder').innerHTML = navbar;
                });
        });