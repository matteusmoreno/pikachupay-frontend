import React from 'react';
import {
    Box,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    useDisclosure,
    IconButton,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    HStack
} from '@chakra-ui/react';
import {
    FaHome,
    FaMoneyBillWave,
    FaUsers,
    FaVideo,
    FaClipboardList,
    FaBars,
    FaSignOutAlt,
    FaBolt,
    FaUser // <--- ADICIONADO AQUI
} from 'react-icons/fa';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { logoutUsuario } from '../services/authService';

const LinkItems = [
    { name: 'Dashboard', icon: FaHome, route: '/dashboard' },
    { name: 'Pagamentos', icon: FaMoneyBillWave, route: '/payments' },
    { name: 'Usuários', icon: FaUsers, route: '/users' },
    { name: 'Streamers', icon: FaVideo, route: '/streamers' },
    { name: 'Planos', icon: FaClipboardList, route: '/plans' },
];

export default function Sidebar({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg="dark.bg">
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            transition="3s ease"
            bg="dark.surface"
            borderRight="1px"
            borderRightColor="gray.700"
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <HStack>
                    <FaBolt color="#FDD835" />
                    <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color="white">
                        Pikachu<span style={{ color: '#FDD835' }}>Pay</span>
                    </Text>
                </HStack>
                <IconButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}
                    variant="outline"
                    aria-label="close menu"
                    icon={<FaBars />}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} route={link.route}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

const NavItem = ({ icon, children, route, ...rest }) => {
    const location = useLocation();
    const isActive = location.pathname === route;

    return (
        <Link as={RouterLink} to={route} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                bg={isActive ? 'brand.500' : 'transparent'}
                color={isActive ? 'black' : 'gray.400'}
                fontWeight={isActive ? 'bold' : 'normal'}
                _hover={{
                    bg: 'brand.500',
                    color: 'black',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        as={icon}
                        _groupHover={{
                            color: 'black',
                        }}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg="dark.surface"
            borderBottomWidth="1px"
            borderBottomColor="gray.700"
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FaBars />}
                color="white"
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
                color="white"
            >
                PikachuPay
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    bg="brand.500"
                                    icon={<FaUser color="black" />}
                                />
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <Text fontSize="sm" color="white">Admin</Text>
                                    <Text fontSize="xs" color="gray.400">Pikachu Pay</Text>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg="dark.surface"
                            borderColor="gray.700"
                        >
                            <MenuItem bg="dark.surface" color="white" _hover={{ bg: 'gray.700' }} onClick={logoutUsuario}>
                                <Icon as={FaSignOutAlt} mr={2} /> Sair
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};