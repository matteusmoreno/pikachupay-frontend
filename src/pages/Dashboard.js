import React from 'react';
import {
    Box,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Heading,
    Text
} from '@chakra-ui/react';
import Sidebar from '../components/Sidebar'; // Importa o layout que criamos

export default function Dashboard() {
    // OBS: Futuramente vamos buscar esses números do backend (PaymentHistoryRepository, etc)
    // Por enquanto, são dados visuais para estruturar o front
    return (
        <Sidebar>
            <Box pt={4}>
                <Heading color="white" mb={2}>Visão Geral</Heading>
                <Text color="gray.400" mb={8}>Acompanhe o desempenho do Pikachu Pay em tempo real.</Text>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
                    {/* Card 1 */}
                    <StatCard
                        title="Receita Total"
                        value="R$ 45.320,00"
                        arrow="increase"
                        percent="23.36%"
                    />

                    {/* Card 2 */}
                    <StatCard
                        title="Novos Usuários"
                        value="1.205"
                        arrow="decrease"
                        percent="9.05%"
                    />

                    {/* Card 3 */}
                    <StatCard
                        title="Pagamentos Hoje"
                        value="340"
                        arrow="increase"
                        percent="12.00%"
                    />

                    {/* Card 4 */}
                    <StatCard
                        title="Planos Ativos"
                        value="89"
                        arrow="increase"
                        percent="5.4%"
                    />
                </SimpleGrid>

                {/* Aqui embaixo depois colocaremos uma tabela de últimas transações */}
                <Box mt={10} p={6} bg="dark.surface" borderRadius="lg" border="1px solid" borderColor="gray.700">
                    <Heading size="md" color="brand.500" mb={4}>Transações Recentes</Heading>
                    <Text color="gray.500">Nenhum pagamento registrado nas últimas horas.</Text>
                </Box>
            </Box>
        </Sidebar>
    );
}

// Componente auxiliar só para os Cards ficarem bonitos e padronizados
const StatCard = ({ title, value, arrow, percent }) => {
    return (
        <Stat
            px={{ base: 4, md: 8 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={'gray.700'}
            bg={'dark.surface'}
            rounded={'lg'}
        >
            <StatLabel fontWeight={'medium'} isTruncated color="gray.400">
                {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'} color="white">
                {value}
            </StatNumber>
            <StatHelpText color="gray.400">
                <StatArrow type={arrow} />
                {percent}
            </StatHelpText>
        </Stat>
    );
};