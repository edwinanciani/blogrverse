import {Box, VStack, Text, Button, Link} from '@chakra-ui/react'
import {FiTwitter, FiInstagram, FiYoutube, FiBookOpen, FiFlag, FiMapPin} from 'react-icons/fi'
import {BiCake} from 'react-icons/Bi'

const Socials = () => {
  return (
    <Box mt={5} display='flex'>
      <VStack w='100%' spacing='25px' p={2} align='start'>
        <Button  leftIcon={<FiFlag />} variant="link" isExternal>
          Venezuelan
        </Button>
        <Button  leftIcon={<FiMapPin />} variant="link">
          Texas, US.
        </Button>
        <Button  leftIcon={<BiCake />} variant="link">
          October
        </Button>
      </VStack>
      <VStack w='100%' spacing='20px' p={2} align='start'>
        <Link href='https://twitter.com/edwinanciani' isExternal>
          <Button  leftIcon={<FiTwitter />} variant="link" isExternal>
            edwinanciani
          </Button>
        </Link>
        <Link href='https://www.instagram.com/edwinanciani/' isExternal>
          <Button  leftIcon={<FiInstagram />} variant="link" isExternal>
            edwinanciani
          </Button>
        </Link>
        <Link href='#' isExternal>
          <Button  leftIcon={<FiYoutube />} variant="link" isExternal>
            Youtube loading...
          </Button>
        </Link>
      </VStack>
    </Box>
  )
}

export default Socials
