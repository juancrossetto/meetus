import React, { ReactNode, ReactText, useContext, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Badge,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiSettings, FiMenu, FiChevronDown, FiGift } from 'react-icons/fi';
import { FaQuestion } from 'react-icons/fa';
import { GiTalk } from 'react-icons/gi';
import { BsMoon, BsSun } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/Auth';
import Spinner from './Spinner';
import toast, { Toaster } from 'react-hot-toast';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import formatNumber from '../utils/formatNumber';

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Inicio', icon: FiHome, url: '/' },
  { name: 'Trivia', icon: FiTrendingUp, url: '/trivia' },
  { name: 'Charlemos', icon: GiTalk, url: '/rooms' },
  { name: 'Pregunta Diaria', icon: FaQuestion, url: '/daily-question' },
  { name: 'Canjear Puntos', icon: FiGift, url: '/rewards' },
  { name: 'Configuración', icon: FiSettings, url: '/settings' },
];

export default function SidebarWithHeader({ children }: { children?: ReactNode }) {
  const { closeSession, loading, message, authenticated, user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (message) {
      toast(message.msg);
    }
  }, [message]);
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
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
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} closeSession={closeSession} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
      {(loading || authenticated === null) && <Spinner />}
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { push, location } = useHistory();
  console.log('location', location);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="4xl"
          fontFamily="monospace"
          fontWeight="bold"
          _hover={{ cursor: 'pointer' }}
          onClick={() => push('/')}
          color="brand.100"
        >
          MeetUs!
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} selected={link.url === location.pathname} icon={link.icon} onClick={() => push(link.url)}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  selected: boolean;
  children: ReactText;
}
const NavItem = ({ icon, selected, children, ...rest }: NavItemProps) => {
  console.log('children', children);
  return (
    <Link href="#" style={{ textDecoration: 'none' }} color={selected ? 'brand.100' : 'black'} fontWeight={selected ? 'bold' : 'normal'}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'brand.100',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  closeSession: () => void;
  user?: User | null;
}
const MobileNav = ({ onOpen, closeSession, user, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { push } = useHistory();

  const handleCloseSession = () => {
    closeSession();
    push('/login');
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton display={{ base: 'flex', md: 'none' }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />

      <Text display={{ base: 'flex', md: 'none' }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} /> */}
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={colorMode === 'light' ? <BsSun /> : <BsMoon />}
          onClick={toggleColorMode}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'md'} src={user?.image} />
                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm">
                    {user ? `${capitalizeFirstLetter(user.name || '')} ${capitalizeFirstLetter(user.surName || '')}` : '-'}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.email}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')} zIndex="99">
              <MenuItem onClick={() => push('/settings')}>Perfil</MenuItem>
              <MenuItem>
                Puntos
                <Badge colorScheme="green" fontSize="0.8em" ml={3}>
                  {formatNumber(user && user.points ? user.points.toString() : '0')}
                </Badge>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => handleCloseSession()}>Cerrar Sesión</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
      <Toaster />
    </Flex>
  );
};
