import api from './api';

export const loginUsuario = async (email, password) => {
    try {
        // O endpoint conforme definido no seu AuthResource.java
        const response = await api.post('/api/v1/auth/login', {
            email,
            password
        });

        // Se der certo, retornamos os dados (que contém o token)
        return response.data;
    } catch (error) {
        // Tratamento de erro profissional
        // O backend retorna erros padronizados (401, 404, etc), vamos repassar isso
        throw error;
    }
};

export const logoutUsuario = () => {
    localStorage.removeItem('pikachupay_token');
    window.location.href = '/';
};