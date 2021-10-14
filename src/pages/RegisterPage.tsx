import React, { useContext, useState } from 'react';
import { Box, FormControl, FormLabel, Input, Stack, Link, Button, Heading, Text, useColorModeValue, HStack } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/Auth';
import Spinner from '../components/Spinner';
import ImageUploader from '../components/ImageUploader';
import Particles from 'react-particles-js';
import './LoginPage.css';

export default function RegisterPage() {
  const { push } = useHistory();
  const { loading, registerUser } = useContext(AuthContext);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [account, setAccount] = useState({
    name: '',
    surName: '',
    dni: '',
    email: '',
    password: '',
    address: '',
    city: '',
    country: '',
    image: '',
    phoneNumber: '',
    points: 0,
  });
  const { name, surName, dni, email, password, address, city, country, phoneNumber } = account;

  const handleSubmit = () => {
    if (password.length < 6) {
      toast('La contraseña debe ser de al menos 6 caracteres', {
        icon: '😔',
        style: {
          borderRadius: '10px',
          background: '#f2657a',
          color: '#fff',
        },
      });
      return;
    }
    if (
      name === '' ||
      surName === '' ||
      dni === '' ||
      email === '' ||
      address === '' ||
      city === '' ||
      country === '' ||
      phoneNumber === '' ||
      password === ''
    ) {
      toast('!Todos los campos son obligatorios!', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#f2657a',
          color: '#fff',
        },
      });
      return;
    }
    if (password !== passwordConfirm) {
      toast('Las contraseñas no son iguales', {
        icon: '😔',
        style: {
          borderRadius: '10px',
          background: '#f2657a',
          color: '#fff',
        },
      });
      return;
    }
    registerUser(account);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

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
      {/* <Box id="main-box" position="absolute" zIndex="9999" w="100%" p={12} display="flex" justifyContent="center" alignItems="center"> */}
      <Box
        minH={'100vh'}
        position="absolute"
        zIndex="9999"
        w="100%"
        display="flex"
        align={'center'}
        justify={'center'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
        p={4}
      >
        <Button
          leftIcon={<MdArrowBack />}
          fontFamily={'heading'}
          mt={6}
          position={'absolute'}
          top={{ base: 'unset', md: '5' }}
          bottom={{ base: '5', md: 'unset' }}
          left={{ base: 'unset', md: '10' }}
          right={{ base: '10', md: 'unset' }}
          w={'28'}
          bg={'brand.100'}
          // bgGradient="linear(to-r, red.400,pink.400)"
          color={'white'}
          _hover={{
            boxShadow: 'xl',
            bg: 'brand.900',
            border: '1px solid white',
          }}
          onClick={() => push('/login')}
        >
          Volver
        </Button>
        <Stack mx={'auto'} maxW={'lg'} pb={12} px={6}>
          <Stack align={'center'} color="white">
            <Heading fontSize={'4xl'} fontWeight="semibold">
              Registrate
            </Heading>
            <Text fontSize={'lg'}>
              para disfrutar de esta gran{' '}
              <Link color={'brand.100'} onClick={() => push('/register')}>
                plataforma
              </Link>{' '}
              ✌️
            </Text>
          </Stack>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={4} border="2px solid" borderColor="brand.100">
            <Stack spacing={4}>
              <ImageUploader
                setImage={(val) =>
                  setAccount({
                    ...account,
                    image: val,
                  })
                }
              />
              <HStack spacing={2}>
                <FormControl id="name">
                  <FormLabel mb={0}>Nombre</FormLabel>
                  <Input name="name" value={name} onChange={handleChange} />
                </FormControl>
                <FormControl id="surName">
                  <FormLabel mb={0}>Apellido</FormLabel>
                  <Input name="surName" value={surName} onChange={handleChange} />
                </FormControl>
              </HStack>
              <HStack spacing={2}>
                <FormControl id="email">
                  <FormLabel mb={0}>Dirección Email</FormLabel>
                  <Input name="email" value={email} onChange={handleChange} />
                </FormControl>
              </HStack>
              <HStack spacing={2}>
                <FormControl id="dni">
                  <FormLabel mb={0}>DNI</FormLabel>
                  <Input name="dni" value={dni} onChange={handleChange} />
                </FormControl>
                <FormControl id="phoneNumber">
                  <FormLabel mb={0}>Teléfono</FormLabel>
                  <Input type="tel" name="phoneNumber" value={phoneNumber} onChange={handleChange} />
                </FormControl>
              </HStack>
              <FormControl id="address">
                <FormLabel mb={0}>Dirección</FormLabel>
                <Input name="address" value={address} onChange={handleChange} />
              </FormControl>
              <HStack spacing={2}>
                <FormControl id="city">
                  <FormLabel mb={0}>Ciudad</FormLabel>
                  <Input name="city" value={city} onChange={handleChange} />
                </FormControl>
                <FormControl id="country">
                  <FormLabel mb={0}>País</FormLabel>
                  <Input name="country" value={country} onChange={handleChange} />
                </FormControl>
              </HStack>
              <HStack spacing={2}>
                <FormControl id="password">
                  <FormLabel mb={0}>Contraseña</FormLabel>
                  <Input name="password" type="password" value={password} onChange={handleChange} />
                </FormControl>
                <FormControl id="passwordConfirm">
                  <FormLabel mb={0}>Confirmar Contraseña</FormLabel>
                  <Input
                    name="passwordConfirm"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </FormControl>
              </HStack>
              <Stack spacing={10}>
                <Button
                  bg={'brand.100'}
                  color={'white'}
                  _hover={{
                    bg: 'brand.900',
                    border: '1px solid white',
                  }}
                  onClick={handleSubmit}
                >
                  Registrarme
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Toaster />
        {loading && <Spinner />}
      </Box>
      {/* </Box> */}
    </>
  );
}
