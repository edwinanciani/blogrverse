import { IconButton } from '@chakra-ui/button'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Center, HStack, Text, Link } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import {useState} from 'react'
const ImageRenderer = ({data, container, blockProps}) => {
  const [hover, setHover] = useState(false)
  const [image, setImage] = useState(data.image)
  
  return (
      <Box 
      onFocus={(e) => e.stopPropagation()}
      onBlur={(e) => e.stopPropagation()}>
      {image ? 
      <>
      <Box  position="relative" w={'100%'} onMouseOver={()=> {
          blockProps.getReadOnly() ? null : setHover(true)
        }} onMouseLeave={() =>{setHover(false)}} maxH={'600px'} my={5} borderRadius={8} overflow={'hidden'}>
        <Image src={image.urls.regular} w={'100%'} h={'100%'} alt={image.alt_description}>
        </Image>
        {
          hover ? <Center position="absolute" display="flex" bg="gray.100" style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            opacity: 0.7
          }} ><IconButton icon={<DeleteIcon />} onClick={() => 
            {
              setImage(null)
              container.remove()
            }}></IconButton></Center>
          :
          null
        }
      </Box>
      <HStack alignItems="center" mb={8} justify="center">
          <Text color="gray.400">By {`${image.user.first_name} ${image.user.last_name}`}</Text>
          <Link href={image.user.portfolio_url}>{`@${image.user.username}`}</Link>
        </HStack>
        </>
        : <Text>Image Not Found</Text>}
      </Box>
  )
}

export default ImageRenderer