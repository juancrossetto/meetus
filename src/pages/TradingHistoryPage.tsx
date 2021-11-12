import React, { useContext, FC, useEffect, useState } from 'react';
import { Box, Stack, useColorModeValue, Text } from '@chakra-ui/react';
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

  return (
    <Layout>
      <Box w="100%" display="flex" align={'center'} justify={'center'}>
        <Stack mx={'auto'} maxW={'lg'} pb={12} px={6}>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={4} border="2px solid" borderColor="brand.100">
            {trades ? (
              trades.map((trade) => (
                <Box key={trade.id}>
                  <RewardCard product={trade.product} onClick={() => console.log('p')} />
                </Box>
              ))
            ) : (
              <Text>No se ha encontrado un historial de canjes</Text>
            )}
          </Box>
        </Stack>
        <Toaster />
        {loading && <Spinner />}
      </Box>
    </Layout>
  );
};

export default TradingHistoryPage;
