import {Box, Stack, ButtonGroup, IconButton, Text} from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Logo from './logo'
const Footer = (props) => {
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{base: '4', md: '8'}}>
      <Stack>
        <Stack direction="row" spacing="4" align="center" justify="space-between">
          <Logo />
          <ButtonGroup variant="ghost" color="gray.600" {...props}>
            <IconButton as="a" href="https://linkedin.com/in/edwinanciani/" aria-label="LinkedIn" icon={<FaLinkedin fontSize="20px" />} />
            <IconButton as="a" href="https://github.com/edwinanciani" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
            <IconButton as="a" href="https://twitter.com/edwinanciani" aria-label="Twitter" icon={<FaTwitter fontSize="20px" />} />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" alignItems="center" alignSelf={{ base: 'center', sm: 'start', md: 'center' }}>
        &copy; {new Date().getFullYear()} All Rights Reserved. edwinanciani@gmail.com
        </Text>
      </Stack>
    </Box>
  )
}

export default Footer
