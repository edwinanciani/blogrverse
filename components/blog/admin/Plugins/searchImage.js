import {InputGroup, Input,  Box, Grid, Image,  HStack } from '@chakra-ui/react'
import { useState} from 'react'
import { toast, Toaster } from 'react-hot-toast'
const SearchImage = ({onImage}) => {
  const [disabled, setDisabled] = useState(false)
  const [images, setImages] = useState([])
  const searchImage = async (event) => {
    if (event.keyCode === 13 ) {
      if (event.target.value.length > 3) {
        setDisabled(true)  
        const photos = await fetch(`/api/images?search=${event.target.value}`).then((res) => res.json())
        setImages(photos)
        console.log(photos);
        setDisabled(false)
      } else {
        setDisabled(false)
        toast.error('More than 3 letters')
      }
    } else {
      setImages([])
    }
  }

  const onSetImageClick = (image) => {
   onImage(image) 
  }

  return (
    <Box w="100%" display="block">
    <Toaster />
    <InputGroup w="100%" maxW="700px">
      <Input placeholder="Search Image then hit Enter" tabIndex={0} onKeyDown={searchImage} width="100%"  variant="" isDisabled={disabled}/>
      { disabled ? '' : null }
    </InputGroup>
   {images.length > 0 ? 
    <Box>
      <Box py={3} w="100%"><HStack justify="space-between"> 
      <Box >Back</Box>
      <Box >Results</Box>
      <Box >Next</Box></HStack></Box>
      <Grid
        maxW="900px"
        templateRows="repeat(4, 0fr)"
        templateColumns="repeat(3, 1fr)"
        width="100%"
        gap={1}
      >
        {images.map((image) => {
        return <Box key={image.id}  onClick={() => onSetImageClick(image)} maxW="700px"><Image src={image.urls?.thumb} alt={image.alt_description}/></Box>
        }) }
      </Grid>
    </Box>
    : null}
    </Box>
  )
}

export default SearchImage