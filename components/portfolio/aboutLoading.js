import { Box, Container, Stack, Skeleton } from '@chakra-ui/react'

const AboutLoading = () => {
  return (<Container maxW="container.xl">
      <Stack direction={{base: 'column', sm: 'column', md: 'row'}} spacing="24px" w='100%'>
        <Box p={5} w='100%' maxW='sm'>
        <Skeleton>
          <Box h='100px' w='200px'>
          </Box>
          <Box pt={3} h='50px' w='200px'>
          </Box>
          <Box pt={3} h='50px' w='200px'>
          </Box>
        </Skeleton>
        <Box pt={3} h='50px' w='100%'>
        <Skeleton>
          <Box h='100px' w='100%'>
          </Box>
        </Skeleton>
        </Box>
        </Box>
        <Box pt={8} w='100%'>
          <Box w='100%'>
          <Skeleton>
          <Box h='600px' w='200px'>
          </Box>
          </Skeleton>
          </Box>
          <Box w='100%'>
          <Skeleton>
          <Box h='100px' w='200px'>
          </Box>
          </Skeleton>
          </Box>
        </Box>
      </Stack>
  </Container>
  )
}

export default AboutLoading
