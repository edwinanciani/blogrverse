import {Container, Box, Image} from '@chakra-ui/react'
import { motion } from "framer-motion"
const Banner = () => {
  return (
    <Container display="flex" style={{position: 'relative'}} centerContent>
      <Box bg="#C3376A" borderRadius="50px" w="30vh" h="400">
      </Box>
    </Container>
  )
}

export default Banner
