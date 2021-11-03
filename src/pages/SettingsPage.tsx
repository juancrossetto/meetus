import React, { useContext, useState, FC, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Stack, Button, useColorModeValue, HStack } from '@chakra-ui/react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/Auth';
import Spinner from '../components/Spinner';
import ImageUploader from '../components/ImageUploader';
import './LoginPage.css';
import Layout from '../components/Layout';
interface SettingsPageProps {}

const SettingsPage: FC<SettingsPageProps> = () => {
  const { push } = useHistory();
  const {
    loading,
     registerUser,
    user,
  } = useContext(AuthContext);
  // const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [account, setAccount] = useState<User>(
    user || {
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
    }
  );
  const { name, surName, dni, email, password, address, city, country, phoneNumber, image } = account;

  const handleSubmit = () => {
    if (password && password.length < 6) {
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
      phoneNumber === ''
      // password === ''
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

    // if (password !== passwordConfirm) {
    //   toast('Las contraseñas no son iguales', {
    //     icon: '😔',
    //     style: {
    //       borderRadius: '10px',
    //       background: '#f2657a',
    //       color: '#fff',
    //     },
    //   });
    //   return;
    // }
    registerUser(account);
    toast('Datos actualizados correctamente!', {
      icon: '😃',
      style: {
        borderRadius: '10px',
        background: '#4bb543',
        color: '#fff',
      },
    });
    localStorage.setItem('user', JSON.stringify(account));
    push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <Box w="100%" display="flex" align={'center'} justify={'center'}>
        <Stack mx={'auto'} maxW={'lg'} pb={12} px={6}>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={4} border="2px solid" borderColor="brand.100">
            <Stack spacing={4}>
              <ImageUploader
                setImage={(val) =>
                  setAccount({
                    ...account,
                    image: val,
                  })
                }
                defaultImage={image ? { dataURL: image } : null}
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
              {/* <HStack spacing={2}>
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
              </HStack> */}
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
                  Guardar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Toaster />
        {loading && <Spinner />}
      </Box>
    </Layout>
  );
};

export default SettingsPage;
