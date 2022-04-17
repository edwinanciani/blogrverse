import {VStack, Button, Link} from '@chakra-ui/react'
import {FiBriefcase, FiGithub, FiLinkedin} from 'react-icons/fi'
import {motion} from 'framer-motion'

const JobLinks = () => {
  return (
    <motion.div
    initial={{opacity: 0, y: 10}}
    animate={{opacity: 1, y: 0}}
    transition={{ ease: "easeIn", duration: 0.6 }}>
    <VStack align="start" pt={5} spacing={4}>
      {/* TODO: Dynamic Links & Icons */}
      <Link href='https://form.io/' isExternal>
        <Button  leftIcon={<FiBriefcase />} color={'primary.200'} variant="link" isExternal>
          Form.io
        </Button>
      </Link>
      <Link href='https://github.com/edwinanciani' isExternal>
        <Button  leftIcon={<FiGithub />} color={'primary.200'} variant="link" isExternal>
          Github
        </Button>
      </Link>
      <Link href='https://linkedin.com/in/edwinanciani/' isExternal>
        <Button  leftIcon={<FiLinkedin />} color={'primary.200'} variant="link" isExternal>
          LinkedIn
        </Button>
      </Link>
    </VStack>
    </motion.div>
  )
}

export default JobLinks
