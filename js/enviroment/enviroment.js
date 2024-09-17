// Função para determinar se está em ambiente de desenvolvimento ou produção
export function returnBaseUrl() {
    let isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    console.log(isLocalhost ? "http:localhost:8080/" : "https://9d5d-187-51-16-18.ngrok-free.app")
    return isLocalhost ? "http://localhost:8080" : "https://7789-187-51-16-18.ngrok-free.app/" 
}

