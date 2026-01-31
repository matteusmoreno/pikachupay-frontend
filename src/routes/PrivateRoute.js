import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Verifica se o token existe no navegador
    const token = localStorage.getItem('pikachupay_token');

    // Se tiver token, renderiza o componente filho (a página)
    // Se não tiver, chuta o usuário de volta para o Login (/)
    return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;