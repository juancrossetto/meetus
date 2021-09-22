import React, { FC, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import RewardCard from '../components/RewardCard';
import { products } from '../utils/productsMock';
import {
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Input,
} from '@chakra-ui/react';
import { MdGraphicEq } from 'react-icons/md';
import formatNumber from '../utils/formatNumber';
import { motion } from 'framer-motion';
import { BsSearch } from 'react-icons/bs';
import useDebounce from '../hooks/useDebounce';

interface RewardsPageProps {}
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const RewardsPage: FC<RewardsPageProps> = () => {
  const [filter, setFilter] = useState<string>('');
  const [points, setPoints] = useState<number>(300000);
  const [productsFiltered, setProductsFiltered] = useState<Product[]>(products);
  const debouncedFilter = useDebounce(filter);
  const debouncedPoints = useDebounce(points, 200);

  useEffect(() => {
    setProductsFiltered(products.filter((p) => p.points >= points && p.name.toLowerCase().includes(filter.toLowerCase())));
  }, [debouncedFilter, debouncedPoints]);

  return (
    <Layout>
      <Flex justifyContent="space-between" mx={4} mb={2}>
        <Slider
          aria-label="slider-ex-4"
          min={0}
          max={3500000}
          defaultValue={300000}
          value={points}
          onChange={(val) => setPoints(val)}
          flex={3}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="#f2657a" />
          </SliderTrack>
          <SliderThumb boxSize={8}>
            <Box color="#f2657a" as={MdGraphicEq} />
            <Text color={useColorModeValue('black', 'white')} fontWeight="bold" position="absolute" bottom="-22px">
              {formatNumber(points.toString())}
            </Text>
          </SliderThumb>
        </Slider>
        <InputGroup flex={1} maxW="280px" ml={10} backgroundColor={useColorModeValue('white', 'transparent')} borderRadius={4}>
          <Input placeholder="Filtrar..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          <InputRightElement children={<BsSearch color="green.500" />} />
        </InputGroup>
      </Flex>
      <motion.div variants={container} initial="hidden" animate="visible">
        <Flex flexWrap="wrap" justifyContent="center">
          {productsFiltered.map((product: Product) => (
            <motion.div variants={item} whileHover={{ scale: [1, 1.03, 1], rotate: [0, 0, 0] }}>
              <RewardCard product={product} />
            </motion.div>
          ))}
        </Flex>
      </motion.div>
    </Layout>
  );
};

export default RewardsPage;
