import React, { FC, useState } from 'react';
import { AspectRatio } from '@chakra-ui/react';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

interface RoomsPageProps {}

const RoomsPage: FC<RoomsPageProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Layout>
      <AspectRatio ratio={16 / 9} minH={'450px'}>
        <iframe
          title="rooms-frame"
          src="https://meetus-rooms.netlify.app/"
          allow="geolocation; microphone; camera; midi; encrypted-media;"
          onLoad={() => setIsLoading(false)}
        />
      </AspectRatio>
      {isLoading && <Spinner />}
    </Layout>
  );
};

export default RoomsPage;
