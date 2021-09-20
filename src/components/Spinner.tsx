import React from 'react';
import { Spinner as ChakraSpinner } from '@chakra-ui/react';

const Spinner = () => (
  <ChakraSpinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
    style={{ position: 'absolute', top: '50%', left: '50%' }}
  />
);

export default Spinner;
