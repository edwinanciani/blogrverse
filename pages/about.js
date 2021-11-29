import {Container, Box, Stack} from '@chakra-ui/react'
import AvatarProfile from '../components/profile/avatar'
import Bio from '../components/profile/bio'
import JobLinks from '../components/profile/joblinks'
import Socials from '../components/profile/socials'
import Badges from '../components/profile/badges'
import { getProfile } from '../lib/formio'

const About = ({profile}) => {
  if (!profile) {
    return(
      <>Oops! Sorry</>
    )
  }
   const { data } = profile;
  return (
    <Container maxW="container.xl">
        <Stack direction={{base: 'column', sm: 'column', md: 'row'}} spacing="24px" w='100%'>
          <Box p={2} w='100%'>
            <AvatarProfile profile={data} />
            <JobLinks links={data.jobLinks}/>
          </Box>
          <Box p={2} w='100%'>
            <Box w='100%'>
              <Bio bio={data.bio} />
              <Socials info={data} />
            </Box>
            <Box p={2} w='100%'>
              <Badges />
            </Box>
          </Box>
        </Stack>
    </Container>
  )
}
export async function getStaticProps() {
  const profile = await getProfile()
  return {
    props: { profile }
  };
}

export default About
