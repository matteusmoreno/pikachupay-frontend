import api from './api';
import axios from 'axios';

// --- LOGIN ---
export const loginUsuario = async (email, password) => {
    try {
        const response = await api.post('/api/v1/auth/login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// --- REGISTER (CADASTRO) ---
export const registerUser = async (userData) => {
    try {
        // Endpoint ajustado para /create conforme sua orientação
        const response = await api.post('/api/v1/users/create', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// --- LOGOUT (A FUNÇÃO QUE FALTAVA) ---
export const logoutUsuario = () => {
    localStorage.removeItem('pikachupay_token');
    // Redireciona para o login forçando o reload para limpar estados
    window.location.href = '/login';
};

// --- UTILITÁRIO: BUSCA CEP ---
export const buscarEnderecoPorCep = async (cep) => {
    try {
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length !== 8) return null;

        // Consulta API pública do ViaCEP
        const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

        if (response.data.erro) {
            throw new Error("CEP não encontrado");
        }

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar CEP", error);
        return null;
    }
};