// Função para determinar se está em ambiente de desenvolvimento ou produção
export function returnBaseUrl() {
    let isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocalhost ? "http://localhost:8080" : "https://76e5-2804-431-c7fb-d612-f326-ca81-4eba-a90e.ngrok-free.app" 
}

