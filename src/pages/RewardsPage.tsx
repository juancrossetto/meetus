import React, { FC, useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import RewardCard from '../components/RewardCard';
import { products } from '../utils/productsMock';
import {
  Stack,
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
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Heading,
  Image,
} from '@chakra-ui/react';
import { MdGraphicEq } from 'react-icons/md';
import { motion } from 'framer-motion';
import { BsSearch } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import formatNumber from '../utils/formatNumber';
import useDebounce from '../hooks/useDebounce';
import Spinner from '../components/Spinner';
import { AuthContext } from '../context/Auth';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [points, setPoints] = useState<number>(user?.points || 0);
  const [productsFiltered, setProductsFiltered] = useState<Product[]>(products);
  const [productSelected, setProductSelected] = useState<Product>();
  const debouncedFilter = useDebounce(filter);
  const debouncedPoints = useDebounce(points, 200);

  const handleExchange = (product: Product) => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Canje realizado correctamente, recibira un mail con mas información', { duration: 5000 });
      setLoading(false);
      onClose();
    }, 1500);
  };

  useEffect(() => {
    setProductsFiltered(products.filter((p) => p.points <= points && p.name.toLowerCase().includes(filter.toLowerCase())));
    // eslint-disable-next-line
  }, [debouncedFilter, debouncedPoints]);

  const handleSelectProduct = (prod: Product) => {
    setProductSelected(prod);
    onOpen();
  };
  return (
    <>
      <Layout>
        <Flex justifyContent="space-between" alignItems="center" mx={4} mb={2} flexDirection={{ base: 'column-reverse', md: 'row' }}>
          <Slider
            aria-label="slider-ex-4"
            min={0}
            max={3500000}
            defaultValue={user?.points || 0}
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
            {productsFiltered && productsFiltered.length ? (
              productsFiltered.map((product: Product) => (
                <motion.div variants={item} whileHover={{ scale: [1, 1.03, 1], rotate: [0, 0, 0] }} key={product.name}>
                  <RewardCard product={product} onClick={() => handleSelectProduct(product)} />
                </motion.div>
              ))
            ) : (
              <Text position="absolute" top="50%" botton="50%" mx="10rem" textAlign="center">
                No se encontraron productos para los filtros indicados
              </Text>
            )}
          </Flex>
        </motion.div>
      </Layout>
      {loading && <Spinner />}
      <Toaster />
      {productSelected && (
        <ProductDrawer
          product={productSelected}
          handleExchange={() => handleExchange(productSelected)}
          onClose={onClose}
          isOpen={isOpen}
          user={user}
        />
      )}
    </>
  );
};

interface ProductDrawerProps {
  product: Product;
  handleExchange: () => void;
  onClose: () => void;
  isOpen: boolean;
  user: User | null;
}
const ProductDrawer: FC<ProductDrawerProps> = ({ product, handleExchange, onClose, isOpen, user }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Canjear Premio</DrawerHeader>

        <DrawerBody px={0}>
          <Stack spacing="12px">
            <Box>
              <Carousel autoPlay infiniteLoop interval={2500}>
                {product.images?.map((p: ProductImage, i: number) => (
                  <Image src={p.url} alt={`Picture of product`} minH="240px" key={i} />
                ))}
              </Carousel>
              <Box px={4} textAlign="center">
                <Heading as="h5" fontSize="3xl" fontWeight="semibold" mb="3rem">
                  {product.name}
                </Heading>
                <Text mb="2rem">{product.description}</Text>
                <Box as="span" color={'gray.500'} fontSize="16px" fontWeight="semibold">
                  {product.madeIn && `ORIGEN: ${product.madeIn} /`} {product.stock && `STOCK: ${product.stock}u`}
                </Box>
              </Box>
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px" justifyContent="space-between">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button bg="#f2657a" onClick={() => handleExchange()} disabled={(user && user.points < product.points) || product.stock <= 0}>
            Canjear
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RewardsPage;