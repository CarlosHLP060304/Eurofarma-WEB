// Função para determinar se está em ambiente de desenvolvimento ou produção
export function returnBaseUrl() {
    let isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocalhost ? "http://localhost:8080" : "https://a06e-2804-7f0-b342-5554-b1db-5919-5cc6-7c12.ngrok-free.app" 
}

