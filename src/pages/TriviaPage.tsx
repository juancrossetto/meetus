import React, { FC, useContext, useState } from 'react';
import { AspectRatio } from '@chakra-ui/react';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import { AuthContext } from '../context/Auth';

interface TriviaPageProps {}

const TriviaPage: FC<TriviaPageProps> = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Layout>
      <AspectRatio ratio={16 / 8} minH={'450px'}>
        <iframe
          title="trivia-frame"
          src={`https://trivia-semi2.herokuapp.com/?userId=${user?._id}`}
          // src={`http://localhost:3000/?userId=${user?._id}`}
          allow="geolocation; microphone; camera; midi; encrypted-media;"
          onLoad={() => setIsLoading(false)}
        />
      </AspectRatio>
      {isLoading && <Spinner />}
    </Layout>
  );
};

export default TriviaPage;
