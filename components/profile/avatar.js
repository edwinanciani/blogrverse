import {Box, Text, Heading, Stack, Button, Avatar} from '@chakra-ui/react'
import {IoLogoAngular, IoLogoJavascript} from 'react-icons/io'
import {FiMail} from 'react-icons/fi'
import { SiReact, SiVuedotjs} from 'react-icons/si'

const AvatarProfile = ({profile}) => {
  console.log(profile);
  const {avatar, name, jobTitle} = profile;
  return (
    <Box>
      <Box display='flex' direction={{base:'column'}}>
        <Avatar size="2xl" name={name} src={avatar[0]?.url}/>
        <Box p={5} maxW='sm'>
          <Heading as='h3' size='lg'>{name}</Heading>
          <Text fontSize='sm'>{jobTitle}</Text>
          <Stack justify="start" direction="row" spacing={5} mt={2}>
            <IoLogoAngular /> <SiReact /> <IoLogoJavascript /> <SiVuedotjs />
          </Stack>
        </Box>
      </Box>
      <Stack justify="center" direction="column" mt={10} p={5} spacing={4}>
        <Button size="md" leftIcon={<FiMail />} variant="solid">
          Contact Me
        </Button>
      </Stack>
    </Box>
  )
}

export default AvatarProfile
