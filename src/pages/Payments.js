import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';

// Placeholder simples para não quebrar a compilação
const Payments = () => {
    return (
        <Sidebar>
            <Box pt={4}>
                <Heading color="white">Pagamentos</Heading>
                <Text color="gray.400">Funcionalidade em desenvolvimento...</Text>
            </Box>
        </Sidebar>
    );
};

export default Payments;