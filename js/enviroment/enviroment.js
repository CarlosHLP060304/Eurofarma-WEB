// Função para determinar se está em ambiente de desenvolvimento ou produção
export function returnBaseUrl() {
    let isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocalhost ? "https://c3a4-2804-431-c7fb-8ae4-ac4b-c915-6f8-fd6a.ngrok-free.app" : "https://7789-187-51-16-18.ngrok-free.app" 
}

