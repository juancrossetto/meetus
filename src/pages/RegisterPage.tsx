import React, { useContext, useState } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, Stack, Link, Button, Heading, Text, useColorModeValue, HStack } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/Auth';
import Spinner from '../components/Spinner';
import ImageUploader from '../components/ImageUploader';

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
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Button
        leftIcon={<MdArrowBack />}
        fontFamily={'heading'}
        mt={6}
        position={'absolute'}
        top={'5'}
        left={'10'}
        w={'28'}
        bgGradient="linear(to-r, red.400,pink.400)"
        color={'white'}
        _hover={{
          bgGradient: 'linear(to-r, red.400,pink.400)',
          boxShadow: 'xl',
        }}
        onClick={() => push('/login')}
      >
        Volver
      </Button>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Registrate</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para disfrutar de esta gran{' '}
            <Link color={'blue.400'} onClick={() => push('/register')}>
              plataforma
            </Link>{' '}
            ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={6}>
          <Stack spacing={4}>
            <ImageUploader
              setImage={(val) =>
                setAccount({
                  ...account,
                  image: val,
                })
              }
            />
            <HStack spacing={4}>
              <FormControl id="name">
                <FormLabel>Nombre</FormLabel>
                <Input name="name" value={name} onChange={handleChange} />
              </FormControl>
              <FormControl id="surName">
                <FormLabel>Apellido</FormLabel>
                <Input name="surName" value={surName} onChange={handleChange} />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl id="email">
                <FormLabel>Dirección Email</FormLabel>
                <Input name="email" value={email} onChange={handleChange} />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl id="dni">
                <FormLabel>DNI</FormLabel>
                <Input name="dni" value={dni} onChange={handleChange} />
              </FormControl>
              <FormControl id="phoneNumber">
                <FormLabel>Teléfono</FormLabel>
                <Input type="tel" name="phoneNumber" value={phoneNumber} onChange={handleChange} />
              </FormControl>
            </HStack>
            <FormControl id="address">
              <FormLabel>Dirección</FormLabel>
              <Input name="address" value={address} onChange={handleChange} />
            </FormControl>
            <HStack spacing={4}>
              <FormControl id="city">
                <FormLabel>Ciudad</FormLabel>
                <Input name="city" value={city} onChange={handleChange} />
              </FormControl>
              <FormControl id="country">
                <FormLabel>País</FormLabel>
                <Input name="country" value={country} onChange={handleChange} />
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input name="password" type="password" value={password} onChange={handleChange} />
              </FormControl>
              <FormControl id="passwordConfirm">
                <FormLabel>Confirmar Contraseña</FormLabel>
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
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
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
    </Flex>
  );
}
