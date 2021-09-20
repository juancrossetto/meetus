import React, { FC, useState } from 'react';
import { AspectRatio } from '@chakra-ui/react';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

interface TriviaPageProps {}

const TriviaPage: FC<TriviaPageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Layout>
      <AspectRatio ratio={16 / 10} allowFullScreen>
        <iframe src="https://trivia-semi2.herokuapp.com/" onLoad={() => setIsLoading(false)} />
      </AspectRatio>
      {isLoading && <Spinner />}
    </Layout>
  );
};

export default TriviaPage;
