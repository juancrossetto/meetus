import React, { FC } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Image, Button, HStack, VStack, Stack } from '@chakra-ui/react';
import NotProfileImage from '../assets/not-profile-image.jpg';

interface ImageUploaderProps {
  setImage?: (image?: any) => void;
}
const ImageUploader: FC<ImageUploaderProps> = ({ setImage }) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    setImages(imageList as never[]);
    if (imageList && imageList.length && setImage) {
      setImage(imageList[0].dataURL);
    }
  };

  return (
    <div className="App">
      <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
        {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          <VStack className="upload__image-wrapper" justifyContent="center" alignItems="center">
            {imageList && !imageList.length && <Image borderRadius="full" boxSize="150px" src={NotProfileImage} alt="Profile Image" />}
            {imageList.map((image, index) => (
              <Stack key={index} className="image-item" alignItems="center">
                <Image borderRadius="full" boxSize="150px" src={image.dataURL} alt="Profile Image" />
                <HStack className="image-item__btn-wrapper">
                  <Button
                    fontFamily={'heading'}
                    // mt={2}
                    bgGradient={isDragging ? 'gray.100' : 'linear(to-r, red.400,pink.400)'}
                    color={isDragging ? 'blue' : 'white'}
                    _hover={{
                      bgGradient: isDragging ? 'gray.100' : 'linear(to-r, red.400,pink.400)',
                      boxShadow: 'xl',
                    }}
                    onClick={() => onImageUpdate(index)}
                    {...dragProps}
                  >
                    Actualizar
                  </Button>
                  <Button
                    fontFamily={'heading'}
                    // mt={2}
                    bgGradient={isDragging ? 'gray.100' : 'linear(to-r, red.400,pink.400)'}
                    color={isDragging ? 'blue' : 'white'}
                    _hover={{
                      bgGradient: isDragging ? 'gray.100' : 'linear(to-r, red.400,pink.400)',
                      boxShadow: 'xl',
                    }}
                    onClick={() => onImageRemove(index)}
                    {...dragProps}
                  >
                    Remover
                  </Button>
                </HStack>
              </Stack>
            ))}
            {imageList && !imageList.length && (
              <Button
                fontFamily={'heading'}
                mt={6}
                w={'2xs'}
                bgGradient={isDragging ? 'gray.100' : 'linear(to-r, red.400,pink.400)'}
                color={isDragging ? 'blue' : 'white'}
                _hover={{
                  bgGradient: isDragging ? 'gray.100' : 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}
                onClick={onImageUpload}
                {...dragProps}
              >
                Cargar Imagen
              </Button>
            )}
          </VStack>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
