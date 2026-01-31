import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Text,
    Heading,
    InputGroup,
    InputLeftElement,
    useToast
} from '@chakra-ui/react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/pikachu-pay-logo-1.png';
import { loginUsuario } from '../services/authService';

const Login = () => {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    const toast = useToast();

    // Estados para armazenar os dados do formulário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita que a página recarregue
        setIsLoading(true);

        try {
            // Chama nosso serviço de conexão com o backend
            const data = await loginUsuario(email, password);

            // Salva o token JWT no navegador
            if (data.token) {
                localStorage.setItem('pikachupay_token', data.token);

                toast({
                    title: 'Login realizado!',
                    description: "Bem-vindo de volta ao Pikachu Pay.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });

                // Redireciona para o Dashboard (que criaremos a seguir)
                navigate('/dashboard');
            }
        } catch (error) {
            // Captura o erro vindo do Backend e mostra na tela
            const errorMessage = error.response?.data?.message || 'Erro ao conectar com o servidor.';

            toast({
                title: 'Falha no login',
                description: errorMessage, // Mostra se foi senha errada ou usuário não encontrado
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="background-glow" />

            <Box className="login-card">
                {/* Formulário envolve os inputs para permitir dar "Enter" para enviar */}
                <form onSubmit={handleLogin}>
                    <VStack spacing={6}>
                        <Box textAlign="center">
                            <img
                                src={logo}
                                alt="Pikachu Pay Logo"
                                className="brand-logo"
                                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto' }}
                            />

                            <Heading as="h1" size="lg" className="title-highlight" mt={4}>
                                PIKACHU <span className="text-yellow">PAY</span>
                            </Heading>
                            <Text fontSize="sm" color="gray.400" mt={1}>
                                Energize seus pagamentos
                            </Text>
                        </Box>

                        <VStack spacing={4} width="100%">
                            <FormControl isRequired>
                                <FormLabel color="gray.300" fontSize="sm">E-mail</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<FaUser color="#FDD835" />} height="50px" />
                                    <Input
                                        type="email"
                                        placeholder="Digite seu e-mail"
                                        className="custom-input"
                                        _placeholder={{ color: 'gray.500' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel color="gray.300" fontSize="sm">Senha</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none" children={<FaLock color="#FDD835" />} height="50px" />
                                    <Input
                                        type="password"
                                        placeholder="Digite sua senha"
                                        className="custom-input"
                                        _placeholder={{ color: 'gray.500' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormControl>

                            <Button
                                type="submit"
                                className="btn-electric"
                                width="full"
                                mt={4}
                                isLoading={isLoading} // Mostra o spinner carregando
                                loadingText="Conectando..."
                                colorScheme="yellow"
                            >
                                ENTRAR NO SISTEMA
                            </Button>
                        </VStack>

                        <Text fontSize="xs" color="gray.500" mt={4}>
                            © {currentYear} Pikachu Pay. Todos os direitos reservados.
                        </Text>
                    </VStack>
                </form>
            </Box>
        </div>
    );
};

export default Login;