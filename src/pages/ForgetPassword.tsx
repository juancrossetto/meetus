import React, { useContext, useState, FC } from 'react';
import { Box, FormControl, FormLabel, Input, Stack, Button, Heading, Text, useColorModeValue, HStack } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router';
import { AuthContext } from '../context/Auth';
import Spinner from '../components/Spinner';
import Particles from 'react-particles-js';
import './LoginPage.css';

interface ForgetPasswordPageProps {}

const ForgetPasswordPage: FC<ForgetPasswordPageProps> = () => {
  const { push } = useHistory();
  const { loading } = useContext(AuthContext);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
  };
  return (
    <>
      <Box position="absolute" zIndex="9999" h={'150vh'} w="100%" backgroundColor="brand.900">
        <Particles
          height="150vh!important"
          style={{ height: '150vh!important' }}
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
        minH={'100vh'}
        position="absolute"
        zIndex="9999"
        w="100%"
        display="flex"
        flexDirection="column"
        align={'center'}
        justify={'center'}
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
        <Stack id="section-1" mx={'auto'} maxW={'lg'} pb={12} px={6} w="500px" minW="300px">
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={4}
            border="2px solid"
            borderColor="brand.100"
            mt={8}
          >
            <Stack align={'center'} color="black">
              <Heading fontSize={'3xl'} fontWeight="semibold">
                ¿Olvidaste tu contraseña?
              </Heading>
              <Text fontSize={'md'}>Vas a recibir un mail con un código para cambiar tu contraseña</Text>
            </Stack>
            <Stack spacing={4}>
              <HStack spacing={2}>
                <FormControl id="email">
                  <FormLabel mb={0}>Email</FormLabel>
                  <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                  Enviar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Stack id={'section-2'} mx={'auto'} maxW={'lg'} pb={12} px={6} w="500px" minW="300px">
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={4} border="2px solid" borderColor="brand.100">
            <Stack align={'center'} color="black">
              <Heading fontSize={'3xl'} fontWeight="semibold">
                ¿Ya recibiste tu código?
              </Heading>
            </Stack>
            <Stack spacing={4}>
              <HStack spacing={2}>
                <FormControl id="email">
                  <FormLabel mb={0}>Email</FormLabel>
                  <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
              </HStack>
              <HStack spacing={2}>
                <FormControl id="code">
                  <FormLabel mb={0}>Código</FormLabel>
                  <Input name="code" value={code} onChange={(e) => setCode(e.target.value)} />
                </FormControl>
              </HStack>
              <HStack spacing={2}>
                <FormControl id="password">
                  <FormLabel mb={0}>Nueva Contraseña</FormLabel>
                  <Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
              </HStack>
              <HStack spacing={2}>
                <FormControl id="passwordConfirm">
                  <FormLabel mb={0}>Confirmar Nueva Contraseña</FormLabel>
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
                  Cambiar contraseña
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <Toaster />
        {loading && <Spinner />}
      </Box>
    </>
  );
};

export default ForgetPasswordPage;
