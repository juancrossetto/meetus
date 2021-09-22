import React, { FC } from 'react';
import { Flex, Circle, Box, Image, Badge, useColorModeValue, Icon, chakra, Tooltip } from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import formatNumber from '../utils/formatNumber';
const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

interface RewardCardProps {
  product: Product;
}
const RewardCard: FC<RewardCardProps> = ({ product }) => {
  return (
    <Flex p={4} alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="350px"
        minW="350px"
        minH="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        boxShadow={'lg'}
        _hover={{ cursor: 'pointer', boxShadow: 'outline', rounded: 'md' }}
      >
        <Image src={product.images[0].url} alt={`Picture of ${data.name}`} roundedTop="lg" minH="270px" />
        <Box p="2" position="absolute" bottom="8px">
          <Box d="flex" alignItems="baseline">
            {product.offerPoints && product.offerPoints > 0 && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Oferta
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="flex-start" alignContent="center">
            <Flex
              justifyContent="space-between"
              flexDirection="column"
              alignContent="center"
              borderRight="1px solid #f2657a"
              paddingRight={2}
              maxW="255px"
            >
              <Box fontSize="l" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated title={product.name}>
                {product.name.toUpperCase()}
              </Box>
              <Box as="span" color={'gray.600'} fontSize="12px" fontWeight="semibold">
                ORIGEN: {product.madeIn} / STOCK: {product.stock}u
              </Box>
            </Flex>
            <Flex justifyContent="space-between" flexDirection="column" alignContent="flex-start" paddingLeft={2}>
              {/* <Tooltip label="Add to cart" bg="white" placement={'top'} color={'gray.800'} fontSize={'1.2em'}>
                <chakra.a href={'#'} display={'flex'}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </chakra.a>
              </Tooltip> */}
              <Box as="p" color={useColorModeValue('black', 'white')} fontSize="lg">
                {formatNumber(product.points.toString())}
              </Box>
              <Box as="span" color={'gray.600'} fontSize="12px" fontWeight="bold">
                PUNTOS MEETUS
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default RewardCard;
