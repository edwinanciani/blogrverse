import {Box, Stack, ButtonGroup, IconButton, Text} from '@chakra-ui/react'
import { useContext } from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { PortfolioContext } from '../lib/context'
import Logo from './logo'
const Footer = () => {
  const {portfolio} = useContext(PortfolioContext)
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="container.2xl" py="12" px={{base: '4', md: '8'}}>
      <Stack>
        <Stack direction="row" spacing="4" align="center" justify="space-between">
          <Logo username={portfolio? portfolio.username : null} logo={portfolio? portfolio.logo : null} />
          <ButtonGroup variant="ghost" color="gray.600"  >
            <IconButton as="a" href="https://linkedin.com/in/edwinanciani/" aria-label="LinkedIn" icon={<FaLinkedin fontSize="20px" />} />
            <IconButton as="a" href="https://github.com/edwinanciani" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
            <IconButton as="a" href="https://twitter.com/edwinanciani" aria-label="Twitter" icon={<FaTwitter fontSize="20px" />} />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" alignItems="center" alignSelf={{ base: 'center', sm: 'start', md: 'center' }}>
        &copy; {new Date().getFullYear()} {portfolio ? portfolio.copyrightFooter : 'Blogrverse'}
        </Text>
      </Stack>
    </Box>
  )
}

export default Footer
