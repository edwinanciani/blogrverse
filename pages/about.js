import {Container, Box, Stack} from '@chakra-ui/react'
import AvatarProfile from '../components/profile/avatar'
import Bio from '../components/profile/bio'
import JobLinks from '../components/profile/joblinks'
import Socials from '../components/profile/socials'
import Badges from '../components/profile/badges'
import { getPortfolio } from '../lib/formio'
import { getUsername } from '../lib/config'
import { useContext, useEffect } from 'react'
import { PortfolioContext } from '../lib/context'
import Head from 'next/head'

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
   const {data} = portfolio;
   const {about} = data
  return (
    <Container maxW="container.xl">
        <Head >
      <title>{portfolio?.data?.pageTitle}</title>
    </Head>
        <Stack direction={{base: 'column', sm: 'column', md: 'row'}} spacing="24px" w='100%'>
          <Box p={2} w='100%'>
            <AvatarProfile profile={about} />
            <JobLinks links={about.jobLinks}/>
          </Box>
          <Box p={2} w='100%'>
            <Box w='100%'>
              <Bio bio={about.bio} />
              <Socials info={about} />
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
  const request = await getPortfolio(username)
  const portfolio = request[0]
  return {
    props: { portfolio }
  };
}

export default About
