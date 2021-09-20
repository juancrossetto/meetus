import React, { FC, useState } from 'react';
import { AspectRatio } from '@chakra-ui/react';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

interface TriviaPageProps {}

const TriviaPage: FC<TriviaPageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Layout>
      <AspectRatio ratio={16 / 8}>
        <iframe
          title="trivia-frame"
          src="https://trivia-semi2.herokuapp.com/"
          allow="geolocation; microphone; camera; midi; encrypted-media;"
          onLoad={() => setIsLoading(false)}
        />
      </AspectRatio>
      {isLoading && <Spinner />}
    </Layout>
  );
};

export default TriviaPage;
