import React, { ReactNode, ReactText, useContext, useEffect, useState } from 'react';
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
  Tooltip,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiSettings, FiMenu, FiChevronDown, FiGift } from 'react-icons/fi';
import { FaQuestion, FaGifts } from 'react-icons/fa';
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
  allowRole: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Inicio', icon: FiHome, url: '/', allowRole: 'all' },
  { name: 'Trivia', icon: FiTrendingUp, url: '/trivia', allowRole: 'user' },
  { name: 'Charlemos', icon: GiTalk, url: '/rooms', allowRole: 'user' },
  { name: 'Pregunta Diaria', icon: FaQuestion, url: '/daily-question', allowRole: 'user' },
  { name: 'Canjear Puntos', icon: FiGift, url: '/rewards', allowRole: 'user' },
  { name: 'Historial de Canjes', icon: FaGifts, url: '/trading-history', allowRole: 'user' },
  { name: 'Administración', icon: FaGifts, url: '/administration', allowRole: 'rrhh' },
  { name: 'Configuración', icon: FiSettings, url: '/settings', allowRole: 'all' },
];

export default function SidebarWithHeader({ children }: { children?: ReactNode }) {
  const { closeSession, loading, message, authenticated, user, updatePoints } = useContext(AuthContext);
  const [points, setPoints] = useState<number>(user?.points || 0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    toast.dismiss();
    // if (user && user.role === 'all' && !LinkItems.find((l) => l.name === 'Historial de Canjes')) {
    //   LinkItems.splice(5, 0);
    // }
    const interval = setInterval(() => {
      const usr = localStorage.getItem('user');
      if (usr) setPoints(JSON.parse(usr).points);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (message) {
      toast(message.msg);
    }
  }, [message]);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent user={user} onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
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
          <SidebarContent user={user} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} closeSession={closeSession} user={user} updatePoints={updatePoints} points={points} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
      {(loading || authenticated === null) && <Spinner />}
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  user: User | null;
  onClose: () => void;
}

const SidebarContent = ({ user, onClose, ...rest }: SidebarProps) => {
  const { push, location } = useHistory();
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
      {LinkItems.filter((l) => ['all', user?.role].includes(l.allowRole)).map((link) => (
        <NavItem key={link.name} selected={link.url === location.pathname} icon={link.icon} url={link.url} user={user}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  url: string;
  user: User | null;
  selected: boolean;
  children: ReactText;
}
const NavItem = ({ icon, url, user, selected, children, ...rest }: NavItemProps) => {
  const { push } = useHistory();
  const dailyResponse = localStorage.getItem(`DAILY_QUESTION_ANSWERED${user ? '_' + user.email : ''}`);
  const isDailyQuestionPage = children === 'Pregunta Diaria';

  return (
    <Link
      onClick={() => (dailyResponse && isDailyQuestionPage ? console.log('opcion no valida') : push(url))}
      // href={url}
      style={{ textDecoration: 'none' }}
      color={useColorModeValue(selected ? 'brand.100' : 'black', selected ? 'brand.100' : 'white')}
      fontWeight={selected ? 'bold' : 'normal'}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor={dailyResponse && isDailyQuestionPage ? 'default' : 'pointer'}
        _hover={{
          bg: dailyResponse && isDailyQuestionPage ? 'transparent' : 'brand.100',
          color: useColorModeValue('black', 'white'),
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {isDailyQuestionPage && dailyResponse ? (
          <Tooltip
            label={`Ya respondió ${dailyResponse === 'correct' ? 'Correctamente' : ' Incorrectamente'}`}
            bg={dailyResponse === 'correct' ? '#4bb543' : ' #f2657a'}
            placement="right-end"
            fontSize="md"
          >
            {children}
          </Tooltip>
        ) : (
          children
        )}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  closeSession: () => void;
  updatePoints: (points: number) => void;
  user?: User | null;
  points: number;
}
const MobileNav = ({ onOpen, closeSession, updatePoints, user, points, ...rest }: MobileProps) => {
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

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        _hover={{ cursor: 'pointer' }}
        onClick={() => push('/')}
        color="brand.100"
      >
        MeetUs!
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
                    {user
                      ? `${capitalizeFirstLetter(user.name || '')} ${capitalizeFirstLetter(user.surName || '')} (${user.role || ''})`
                      : '-'}
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
              {['user', 'all'].includes(user?.role ?? '') && (
                <MenuItem>
                  Puntos
                  <Badge colorScheme="green" fontSize="0.8em" ml={3}>
                    {formatNumber(points.toString())}
                  </Badge>
                </MenuItem>
              )}
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
