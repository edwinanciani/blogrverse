import {Container, Box} from '@chakra-ui/react'
const Banner = () => {
  return (
    <Container display="flex" style={{position: 'relative'}} centerContent>
      <Box bg={'primary.100'} borderRadius="50px" w="30vh" h="400">
      </Box>
    </Container>
  )
}

export default Banner
