import {Box, VStack, Button, Link} from '@chakra-ui/react'
import {FiTwitter, FiInstagram, FiYoutube, FiFlag, FiMapPin} from 'react-icons/fi'
import {BiCake} from 'react-icons/bi'
import { motion } from 'framer-motion'

const Socials = ({info}) => {
  return (
    <Box mt={5} display='flex'>
    <motion.div
    initial={{opacity: 0, y: 10}}
    animate={{opacity: 1, y: 0}}
    transition={{ ease: "easeIn", duration: 0.9 }}>
      <VStack w='100%' spacing='25px' p={2} align='start'>
        <Button  leftIcon={<FiFlag />} variant="link">
          {info.countryFrom}
        </Button>
        <Button  leftIcon={<FiMapPin />} variant="link">
          {info.currentCountry}
        </Button>
        <Button  leftIcon={<BiCake />} variant="link">
          {info.dayMonth}
        </Button>
      </VStack>
      <VStack w='100%' spacing='20px' p={2} align='start'>
        {/* TODO: Dynamic Icons + socials */}
        <Link href='https://twitter.com/edwinanciani' isExternal>
          <Button  leftIcon={<FiTwitter />} variant="link">
            edwinanciani
          </Button>
        </Link>
        <Link href='https://www.instagram.com/edwinanciani/' isExternal>
          <Button  leftIcon={<FiInstagram />} variant="link">
            edwinanciani
          </Button>
        </Link>
        <Link href='#'>
          <Button  leftIcon={<FiYoutube />} variant="link">
            Youtube loading...
          </Button>
        </Link>
      </VStack>
      </motion.div>
    </Box>
  )
}

export default Socials
