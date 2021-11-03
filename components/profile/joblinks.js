import {VStack, Text, Button, Link} from '@chakra-ui/react'
import {FiBriefcase, FiGithub, FiLinkedin} from 'react-icons/fi'

const JobLinks = () => {
  return (
    <VStack align="start" pt={5} spacing={4}>
      <Link href='https://form.io/' isExternal>
        <Button  leftIcon={<FiBriefcase />} color="#C3376A" variant="link" isExternal>
          Form.io
        </Button>
      </Link>
      <Link href='https://github.com/edwinanciani' isExternal>
        <Button  leftIcon={<FiGithub />} color="#C3376A" variant="link" isExternal>
          Github
        </Button>
      </Link>
      <Link href='https://linkedin.com/in/edwinanciani/' isExternal>
        <Button  leftIcon={<FiLinkedin />} color="#C3376A" variant="link" isExternal>
          LinkedIn
        </Button>
      </Link>
    </VStack>
  )
}

export default JobLinks
