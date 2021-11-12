import React, { FC, useState } from 'react';
import { Flex, Box, Image, Badge, useColorModeValue, Skeleton } from '@chakra-ui/react';
import formatNumber from '../utils/formatNumber';

interface RewardCardProps {
  product: Product;
  onClick: () => void;
}
const RewardCard: FC<RewardCardProps> = ({ product, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <>
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
          onClick={onClick}
        >
          <Skeleton isLoaded={imageLoaded}>
            <Image
              src={typeof product.images === 'string' ? product.images : product.images[0].url}
              alt={`Picture of ${product.name}`}
              roundedTop="lg"
              minH="270px"
              onLoad={() => setImageLoaded(true)}
            />
          </Skeleton>
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
    </>
  );
};

export default RewardCard;
