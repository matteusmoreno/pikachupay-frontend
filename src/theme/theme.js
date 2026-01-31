import { extendTheme } from '@chakra-ui/react';

// Configuração das cores baseadas na identidade Pikachu Pay
const colors = {
    brand: {
        100: '#FFF9C4', // Amarelo muito claro
        200: '#FFF176', // Amarelo claro
        300: '#FFEE58',
        400: '#FFEB3B', // Amarelo padrão
        500: '#FDD835', // Amarelo Pikachu Principal
        600: '#FBC02D', // Amarelo escuro (hover)
        700: '#F9A825',
        800: '#F57F17',
        900: '#FFFF00', // Amarelo elétrico para detalhes
    },
    dark: {
        bg: '#121212',       // Fundo muito escuro (quase preto)
        surface: '#1E1E1E',  // Fundo de cartões/paineis
        text: '#E0E0E0'      // Texto claro
    }
};

const theme = extendTheme({
    config: {
        initialColorMode: 'dark', // Começa no modo escuro
        useSystemColorMode: false,
    },
    styles: {
        global: (props) => ({
            body: {
                bg: props.colorMode === 'dark' ? 'dark.bg' : 'gray.50',
                color: props.colorMode === 'dark' ? 'dark.text' : 'gray.900',
            },
        }),
    },
    colors,
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'bold',
                borderRadius: '8px',
            },
            variants: {
                solid: (props) => ({
                    bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
                    color: 'black', // Texto preto no botão amarelo para contraste
                    _hover: {
                        bg: 'brand.600',
                    },
                }),
            },
        },
    },
});

export default theme;