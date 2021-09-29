import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  components: {
    Button: {
      variants: {
        outline: {
          borderWidth: 2,
          ':hover': {
            color: 'black',
          },
        },
        link: {
          color: 'white',
        },
      },
    },
  },
  fontSizes: {
    lg: '18px',
  },
  colors: {
    blue: {
      one: '#5985eb',
    },
    brand: {
      100: '#5985eb',
      900: '#1a202c',
    },
  },
});
