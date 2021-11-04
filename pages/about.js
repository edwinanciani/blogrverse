import {Container, Box, Stack} from '@chakra-ui/react'
import AvatarProfile from '../components/profile/avatar'
import Bio from '../components/profile/bio'
import JobLinks from '../components/profile/joblinks'
import Socials from '../components/profile/socials'
import Badges from '../components/profile/badges'
import AboutLoading from '../components/portfolio/aboutLoading'
import useSWR from 'swr'
const fetcher = (url) => fetch(url).then((res) => res.json());

const About = () => {
  const { data, error } = useSWR(
     "/api/profile",
     fetcher
   );
   if (error) return "An error has occurred.";
   if (!data) return <AboutLoading />;
   const profile = data.data;
  return (
    <Container maxW="container.xl">
        <Stack direction={{base: 'column', sm: 'column', md: 'row'}} spacing="24px" w='100%'>
          <Box p={2} w='100%'>
            <AvatarProfile profile={profile} />
            <JobLinks links={profile.jobLinks}/>
          </Box>
          <Box p={2} w='100%'>
            <Box w='100%'>
              <Bio bio={profile.bio} />
              <Socials info={profile} />
            </Box>
            <Box p={2} w='100%'>
              <Badges />
            </Box>
          </Box>
        </Stack>
    </Container>
  )
}

export default About
