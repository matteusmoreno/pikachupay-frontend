import React from 'react';
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
    InputLeftElement
} from '@chakra-ui/react';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css'; // Importa nosso CSS autoral
import logo from '../assets/picachu-pay-logo-1.png'; // Importando a logo

const Login = () => {
    return (
        <div className="login-container">
            {/* Luz de fundo decorativa */}
            <div className="background-glow" />

            {/* Cartão de Login */}
            <Box className="login-card">
                <VStack spacing={6}>
                    {/* Logo e Título */}
                    <Box textAlign="center">
                        {/* Imagem da Logo com classe para animação e brilho */}
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

                    {/* Formulário */}
                    <VStack spacing={4} width="100%">
                        <FormControl>
                            <FormLabel color="gray.300" fontSize="sm">E-mail</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" children={<FaUser color="#FDD835" />} height="50px" />
                                <Input
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    className="custom-input" // Nossa classe CSS
                                    _placeholder={{ color: 'gray.500' }}
                                />
                            </InputGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="gray.300" fontSize="sm">Senha</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" children={<FaLock color="#FDD835" />} height="50px" />
                                <Input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    className="custom-input" // Nossa classe CSS
                                    _placeholder={{ color: 'gray.500' }}
                                />
                            </InputGroup>
                        </FormControl>

                        <Button
                            className="btn-electric" // Nossa classe CSS
                            width="full"
                            mt={4}
                        >
                            ENTRAR
                        </Button>
                    </VStack>

                    <Text fontSize="xs" color="gray.500" mt={4}>
                        © 2026 Pikachu Pay. Todos os direitos reservados.
                    </Text>
                </VStack>
            </Box>
        </div>
    );
};

export default Login;