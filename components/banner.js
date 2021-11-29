import {Container, Box} from '@chakra-ui/react'
import bannerStyle from '../styles/Banner.module.css'
const Banner = () => {
  return (
    <Container display="flex" style={{position: 'relative'}} centerContent>
      <Box className={bannerStyle.background} borderRadius="50px" w="30vh" h="400">
      </Box>
    </Container>
  )
}

export default Banner
