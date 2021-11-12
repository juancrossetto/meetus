import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Box, Button, Heading, Image, VStack, Skeleton } from '@chakra-ui/react';
import { AuthContext } from '../context/Auth';
import Social1 from '../assets/social-1.png';
import Social2 from '../assets/social-2.png';
import Social3 from '../assets/social-3.png';
import Social4 from '../assets/social-4.png';
import Social5 from '../assets/social-5.png';
import Layout from '../components/Layout';

const images = [Social1, Social2, Social3, Social4, Social5];
interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [image, setImage] = useState<string>();
  const { push } = useHistory();
  const { userAuthenticated, user } = useContext(AuthContext);
  useEffect(() => {
    userAuthenticated();
    setImage(images[Math.floor(Math.random() * (images.length - 0) + 0)]);
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log('imageLoaded',imageLoaded);
  // }, [imageLoaded]);

  return (
    <Layout>
      <Skeleton isLoaded={imageLoaded}>
        <Box p={10}>
          <Heading color="#5985eb">Bienvenido/a {user?.name}!</Heading>
          <VStack spacing={8} justifyContent="center" alignItems="center">
            <Image
              src={image}
              alt={'Home Picture'}
              roundedTop="lg"
              backgroundColor="transparent"
              width="900px"
              height="600px"
              onLoad={() => setImageLoaded(true)}
            />
            <Button
              fontFamily={'heading'}
              bg="brand.100"
              color={'white'}
              _hover={{
                boxShadow: 'xl',
                border: '1px solid white',
                bg: 'brand.900',
              }}
              onClick={() => push('/trivia')}
            >
              Comenzar a Jugar
            </Button>
          </VStack>
        </Box>
      </Skeleton>
    </Layout>
  );
};

export default HomePage;
