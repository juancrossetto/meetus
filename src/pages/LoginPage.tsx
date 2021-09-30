import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Checkbox,
  Link,
} from '@chakra-ui/react';
import { AuthContext } from '../context/Auth';
import { useHistory } from 'react-router';
import Accenture from '../assets/companies/accenture.png';
import Meli from '../assets/companies/meli.png';
import Santander from '../assets/companies/santander.png';
import Globant from '../assets/companies/globant.png';
import Despegar from '../assets/companies/despegar.png';
// import BackgroundLogin from '../assets/login-background.jpg';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../components/Spinner';
import Particles from 'react-particles-js';
import './LoginPage.css';

const enterprises = [
  {
    name: 'Globant',
    url: Globant,
  },
  {
    name: 'Accenture',
    url: Accenture,
  },
  {
    name: 'Mercado Libre',
    url: Meli,
  },
  {
    name: 'Santander',
    url: Santander,
  },
  {
    name: 'Despegar.com',
    url: Despegar,
  },
];

const DEFAULT_EMAIL = 'juan@gmail.com';
const DEFAULT_PASS = '123456';
export default function LoginPage() {
  const { push, goBack, location } = useHistory();
  const { message, authenticated, login, loading } = useContext(AuthContext);
  const [account, setAccount] = useState<User>({
    email: '',
    password: '',
    points: 0,
  });
  const { email, password } = account;

  const handleLogin = () => {
    if (email === '' || password === '') {
      login({
        ...account,
        email: DEFAULT_EMAIL,
        password: DEFAULT_PASS,
      });
    } else {
      login(account);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (authenticated) {
      if (location.pathname !== '/login') {
        goBack();
      } else {
        push('/');
      }
    }
    // eslint-disable-next-line
  }, [authenticated]);

  useEffect(() => {
    if (message) {
      toast(message.msg);
    }
  }, [message]);

  return (
    <>
      <Box position="absolute" zIndex="9999" h={'100vh'} w="100%" backgroundColor="brand.900">
        <Particles
          height="100%!important"
          style={{ height: '100%!important' }}
          params={{
            particles: {
              color: {
                value: '##5985eb',
              },
              number: {
                value: 80,
              },
              size: {
                value: 5,
              },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: 'repulse',
                },
              },
            },
            themes: [
              {
                name: 'light',
                default: {
                  value: true,
                },
                options: {
                  particles: {
                    color: {
                      value: ['#5985eb'],
                    },
                  },
                },
              },
            ],
          }}
        />
      </Box>
      <Box
        id="main-box"
        // position={'relative'}
        position="absolute"
        zIndex="9999"
        h={'100vh'}
        w="100%"
        // backgroundImage={BackgroundLogin}
        // opacity=".2"
        // backgroundPosition="center"
        // backgroundRepeat="no-repeat"
        p={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Toaster />
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 8, lg: 25 }}
          py={{ base: 8, sm: 16, lg: 25 }}
          borderRadius="xl"
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={{ base: 10, md: 15 }}>
            <Heading
              lineHeight={1}
              fontSize={{ base: '40px', sm: '40px', md: '65px', lg: '65px' }}
              fontWeight={'semibold'}
              style={{ zIndex: 1 }}
              color={'#ffffff'}
              textAlign={{ base: 'center', md: 'start' }}
            >
              Bienvenido a{' '}
              <Text as={'span'} bg="brand.100" bgClip="text">
                MeetUs!
              </Text>
              <br />
              Ingresá y divertite
            </Heading>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align={'center'}>
              <AvatarGroup>
                {enterprises.map((enterprise) => (
                  <Avatar
                    key={enterprise.name}
                    name={enterprise.name}
                    src={enterprise.url}
                    size={'lg'}
                    position={'relative'}
                    zIndex={2}
                    border="10px solid brand.100"
                    borderColor="brand.100"
                    // _before={{
                    //   content: '""',
                    //   width: 'full',
                    //   height: 'full',
                    //   rounded: 'full',
                    //   transform: 'scale(1.125)',
                    //   bgGradient: 'linear(to-bl, red.400,pink.400)',
                    //   position: 'absolute',
                    //   zIndex: -1,
                    //   top: 0,
                    //   left: 0,
                    // }}
                  />
                ))}
              </AvatarGroup>
              <Text fontFamily={'heading'} fontSize={{ base: '2xl', md: '4xl' }}>
                +
              </Text>
              <Flex
                align={'center'}
                justify={'center'}
                fontFamily={'heading'}
                fontSize={{ base: 'sm', md: 'lg' }}
                bg={'white'}
                color={'black'}
                rounded={'full'}
                width={useBreakpointValue({ base: '60px', md: '60px' })}
                height={useBreakpointValue({ base: '60px', md: '60px' })}
                position={'relative'}
                // border="2px solid brand.100"
                // borderColor="brand.100"
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'brand.100',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                VOS
              </Flex>
            </Stack>
          </Stack>
          <Stack
            id="session-box"
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 6 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}
            border="2px solid"
            borderColor="brand.100"
          >
            <Stack spacing={4}>
              <Heading color={'gray.800'} lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }} fontWeight="semibold">
                Inicia Sesión
              </Heading>
              {/* <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam harum maiores dicta cumque id modi distinctio atque inventore
              voluptatum.
            </Text> */}
            </Stack>
            <Box as={'form'} mt={10}>
              <Stack spacing={4}>
                <Input
                  name="email"
                  placeholder="Email Corporativo"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={handleChange}
                  value={email}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  onChange={handleChange}
                  value={password}
                />
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'} color="black">
                  <Checkbox borderColor="brand.100">Recordarme</Checkbox>
                </Stack>
                <Button
                  fontFamily={'heading'}
                  bg={'gray.200'}
                  color={'gray.800'}
                  onClick={() => push('/register')}
                  _hover={{ bg: 'gray.300' }}
                >
                  Registrarse
                </Button>
              </Stack>
              <Button
                fontFamily={'heading'}
                mt={6}
                w={'full'}
                bg="brand.100"
                color={'white'}
                _hover={{
                  boxShadow: 'xl',
                  border: '1px solid white',
                  bg: 'brand.900',
                }}
                onClick={() => handleLogin()}
              >
                Ingresar
              </Button>
              <Box w="full" textAlign="center" mt={4}>
                <Link color="black" onClick={() => push('/recover-password')}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>
            </Box>
            form
          </Stack>
        </Container>
        {/* <Blur position={'absolute'} top={-10} left={-10} style={{ filter: 'blur(50px)' }} /> */}
        {/* <Image
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(2px)' }}
        alt={'Login Image'}
        objectFit={'cover'}
        src={
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
        }
      /> */}
        {loading && <Spinner />}
      </Box>
      {/* </Particles> */}
    </>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '50vw', lg: '40vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="600px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
