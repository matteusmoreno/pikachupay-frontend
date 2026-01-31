import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8787', // Endereço do seu Backend Quarkus
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar o Token JWT automaticamente em toda requisição se o usuário estiver logado
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('pikachupay_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;