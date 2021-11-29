import { Image } from "@chakra-ui/image"
import { Box, IconButton, Link, HStack, VStack, Text } from "@chakra-ui/react"
import SearchImage from "./searchImage"
import {useState} from 'react';
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";

const ImagePlugin = ({onImageSet}) => {
  const [image, setImage] = useState(null)
  const searchImage = (image)=> {
    setImage(image)
  }
  return (
    <Box  >
      {
        image ? 
        <Box maxW="900px">
          <VStack spacing={3} py={5}>
            <Image src={image.urls.regular} alt={image.alt_description} /> 
            <VStack align="center">
              <Text fontSize="sm">{`"${image.alt_description}"`}</Text>
              <HStack>
                <Text>{`${image.user.first_name} ${image.user.last_name}`}</Text>
                <Link href={image.user.portfolio_url}>{`@${image.user.username}`}</Link>
              </HStack>
            </VStack>
          </VStack>
          <HStack justify="center">
            <IconButton aria-label="Choose Image" onClick={() => onImageSet(image)} icon={<CheckIcon />} />
            <IconButton aria-label="Delete Image" onClick={() => setImage(null)} icon={<DeleteIcon />} />
          </HStack>
        </Box>: 
        <SearchImage onImage={searchImage} />
      }
    </Box> 
  )
}

export default ImagePlugin