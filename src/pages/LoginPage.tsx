import React, { useState } from 'react';
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
  useColorModeValue,
  Checkbox,
  Link,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import Accenture from '../assets/companies/accenture.png';
import Meli from '../assets/companies/meli.png';
import Santander from '../assets/companies/santander.png';
import Globant from '../assets/companies/globant.png';
import Despegar from '../assets/companies/despegar.png';
import BackgroundLogin from '../assets/login-background.jpg';
import toast, { Toaster } from 'react-hot-toast';

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
const DEFAULT_PASS = '123';
export default function LoginPage() {
  const { push } = useHistory();
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASS);

  const handleLogin = () => {
    console.log('email', email);
    console.log('password', password);
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASS) {
      push('/');
      toast.success('Bienvenido Juan');
    } else {
      toast('Error al ingresar credenciales', {
        icon: '😔',
        style: {
          borderRadius: '10px',
          background: '#f2657a',
          color: '#fff',
        },
      });
    }
  };
  return (
    <Box
      id="main-box"
      position={'relative'}
      h={'100vh'}
      w="100%"
      backgroundImage={BackgroundLogin}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
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
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
        // bg={useColorModeValue('#ffffff99', '#00000099')}
        borderRadius="xl"
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading lineHeight={1.1} fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }} style={{ zIndex: 1 }} color={'#ffffff'}>
            Bienvenido a{' '}
            <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
              MeetUs
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
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
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
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              width={useBreakpointValue({ base: '60px', md: '60px' })}
              height={useBreakpointValue({ base: '60px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack bg={'gray.50'} rounded={'xl'} p={{ base: 4, sm: 6, md: 8 }} spacing={{ base: 8 }} maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading color={'gray.800'} lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Inicia Sesión
              <Text as={'span'} bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam harum maiores dicta cumque id modi distinctio atque inventore
              voluptatum.
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Email Corporativo"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                placeholder="Contraseña"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox>Recordarme</Checkbox>
                {/* <Link color={'blue.400'}>Forgot password?</Link> */}
              </Stack>
              <Button fontFamily={'heading'} bg={'gray.200'} color={'gray.800'} onClick={() => push('/register')}>
                Registrarse
              </Button>
            </Stack>
            <Button
              fontFamily={'heading'}
              mt={6}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
              onClick={() => handleLogin()}
            >
              Ingresar
            </Button>
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
    </Box>
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
