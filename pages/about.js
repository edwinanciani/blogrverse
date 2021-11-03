import {Container, Box, Stack} from '@chakra-ui/react'
import AvatarProfile from '../components/profile/avatar'
import Bio from '../components/profile/bio'
import JobLinks from '../components/profile/joblinks'
import Socials from '../components/profile/socials'
import Badges from '../components/profile/badges'
import { motion } from "framer-motion"

const About = () => {
  return (
    <Container maxW="container.xl" pt={10}>
      <motion.div
      initial={{opacity: 0, y: 10}}
      animate={{opacity: 1, y: 0}}
      transition={{ ease: "easeIn", duration: 0.5 }}>
        <Stack direction={{base: 'row', sm: 'column', md: 'row'}} spacing="24px" w='100%'>
          <Box p={2} w='100%' maxW='sm'>
            <AvatarProfile />
            <JobLinks />
          </Box>
          <Box p={2} w='100%'>
            <Box w='100%'>
              <Bio />
              <Socials />
            </Box>
            <Box p={2} w='100%'>
              <Badges />
            </Box>
          </Box>
        </Stack>
      </motion.div>
    </Container>
  )
}

export default About
