import {Container, Box, Stack} from '@chakra-ui/react'
import AvatarProfile from '../components/profile/avatar'
import Bio from '../components/profile/bio'
import JobLinks from '../components/profile/joblinks'
import Socials from '../components/profile/socials'
import Badges from '../components/profile/badges'
import { firestore, postToJSON } from '../lib/firebase'
import { getUsername } from '../lib/config'
import { useContext, useEffect } from 'react'
import { PortfolioContext } from '../lib/context'

const About = ({portfolio}) => {
  const {actions} = useContext(PortfolioContext)
  useEffect(() => {
    if (!portfolio) {
      return;
    }
    actions.set(portfolio)
  }, [portfolio, actions])
  if(!portfolio) {
    return <>Portfolio not found</>
  }
   const {about} = portfolio;
   const data = about
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
export async function getServerSideProps({req}) {
  const username = getUsername(req)
  const ref = firestore.collection('portfolios').doc(username)
  const portfolio = postToJSON(await ref.get())
  return {
    props: { portfolio }
  };
}

export default About
