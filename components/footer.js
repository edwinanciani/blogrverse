import {Box, Stack, ButtonGroup,Text} from '@chakra-ui/react'
import { useContext } from 'react'
import { PortfolioContext } from '../lib/context'
import FooterSocials from './blog/posts/FooterSocials'
import Logo from './logo'
const Footer = () => {
  const {portfolio} = useContext(PortfolioContext)
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="container.2xl" py="12" px={{base: '4', md: '8'}}>
      <Stack>
        <Stack direction="row" spacing="4" align="center" justify="space-between">
          <Logo username={portfolio? portfolio.data.username : null} logo={portfolio? portfolio.data.logo : null} />
          <ButtonGroup variant="ghost" color="gray.600"  >
            {
              portfolio?.data?.about ?
              <>{
                <FooterSocials links={portfolio.data.about.socialNetwork} />
              }</> 
              :
              null
            }
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" alignItems="center" alignSelf={{ base: 'center', sm: 'start', md: 'center' }}>
        &copy; {new Date().getFullYear()} {portfolio ? portfolio.data.copyrightFooter : 'Blogrverse'}
        </Text>
      </Stack>
    </Box>
  )
}

export default Footer
