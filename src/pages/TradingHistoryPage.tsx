import React, { useContext, FC, useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import moment from 'moment-mini';
import toast, { Toaster } from 'react-hot-toast';
// import { useHistory } from 'react-router';
import { AuthContext } from '../context/Auth';
import Spinner from '../components/Spinner';
import './LoginPage.css';
import Layout from '../components/Layout';
import RewardCard from '../components/RewardCard';
interface TradingHistoryPageProps {}

const TradingHistoryPage: FC<TradingHistoryPageProps> = () => {
  // const { push } = useHistory();
  const { loading, getHistoryTrades } = useContext(AuthContext);
  const [trades, setTrades] = useState<Trade[]>();

  useEffect(() => {
    const getTrades = async () => {
      const response = await getHistoryTrades();
      if (response && response.trades) {
        setTrades(response.trades);
      }
    };

    getTrades();
    toast.dismiss();
    // eslint-disable-next-line
  }, []);
  console.log('trades', trades);
  return (
    <Layout>
      <Heading mb={5}>Mis Canjes</Heading>
      <Box w="100%" display="flex" flexWrap="wrap" align={'center'} justify={'space-around'}>
        {trades && trades.length ? (
          trades.map((trade) => (
            <VStack
              key={trade.id}
              w={'100%'}
              maxW="370px"
              minW="370px"
              rounded={'lg'}
              boxShadow={'lg'}
              p={0}
              m={2}
              border="1px solid"
              borderColor="brand.100"
              transform={'rotate(-3deg)'}
              transition="1s ease-in-out"
              _hover={{
                cursor: 'pointer',
                transform: 'rotate(0deg)',
                top: '-10px',
              }}
            >
              <Box id="trade-info" minW="170px" w={'100%'} px={5} pt={2}>
                <HStack>
                  <Text fontWeight="bold" color="#5985eb">
                    Puntos:
                  </Text>
                  <Text>{trade.points}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold" color="#5985eb">
                    Fecha de Pedido:
                  </Text>{' '}
                  <Text>{moment(trade.fechaAlta).format('DD/MM/YYYY HH:mm:ss')}</Text>
                </HStack>
              </Box>
              <Box>
                <RewardCard product={trade.product} onClick={() => console.log('p')} />
              </Box>
            </VStack>
          ))
        ) : (
          <Text>No se ha encontrado un historial de canjes</Text>
        )}
        <Toaster />
        {loading && <Spinner />}
      </Box>
    </Layout>
  );
};

export default TradingHistoryPage;
