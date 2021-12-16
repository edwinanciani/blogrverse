import { IconButton } from '@chakra-ui/button'
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import { Box, Center, Heading, HStack, VStack, Text, Link } from '@chakra-ui/layout'
import React, {useState} from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import ImagePlugin from './ImagePlugin'

export const Banner = ({setImage, getImage}) => {
  const [uploadImage, setUploadImage] = useState(false)
  const [searchImage, setSearchImage] = useState(false)
  const [hover, setHover] = useState(false)
  const [bannerImage, setBannerImage] = useState(setImage)
  const setImageInBanner = (image) => {
    setBannerImage(image)
    if(getImage) {
      getImage(image)
    }
  }
  return (
    <div>
      {bannerImage ? 
      <>
      <Box position="relative" w={'100%'} onMouseOver={()=> {setHover(true)}} onMouseLeave={() =>{setHover(false)}} maxH={'600px'} my={5} borderRadius={8} overflow={'hidden'}>
        <Image src={bannerImage.urls.regular} w={'100%'} h={'100%'} alt={bannerImage.alt_description}>
        </Image>
        {
          hover ? <Center position="absolute" display="flex" bg="gray.100" style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            opacity: 0.7
          }} ><IconButton icon={<DeleteIcon />} onClick={() => setBannerImage(null)}></IconButton></Center>
          :
          null
        }
      </Box>
      <HStack alignItems="center" mb={8} justify="center">
          <Text color="gray.400">By {`${bannerImage.user.first_name} ${bannerImage.user.last_name}`}</Text>
          <Link href={bannerImage.user.portfolio_url}>{`@${bannerImage.user.username}`}</Link>
        </HStack>
      </>
      :
      <Box my={10} py={10} w="100%" bg="gray.50">
          <VStack w="100%">
            <Heading as="h3" py={2} size='md'>Add Banner</Heading>
            <HStack spacing={5}>
              <IconButton shadow={'md'} aria-label="Search Image" onClick={
                ()=> {
                  setSearchImage(true)
                  setUploadImage(false)
                }
                } icon={<SearchIcon />} />
              <IconButton shadow={'md'} aria-label="Upload Image" onClick={()=> {
                setUploadImage(true)
                setSearchImage(false)
              }} icon={<AiOutlineUpload />} />
            </HStack>
            {searchImage ? <Box maxW={'700px'} w="700px"><ImagePlugin onImageSet={setImageInBanner} /></Box> : null}
            {/* Add React Dropzone */}
            {uploadImage ? <>react-dropzone</> : null}
            {/* Add alt text */}
          </VStack>
      </Box> }
    </div>
  )
}
