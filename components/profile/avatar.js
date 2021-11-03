import {Box, Text, Heading, Stack, Button, Avatar} from '@chakra-ui/react'
import {IoLogoAngular, IoLogoJavascript, IoLogoReact} from 'react-icons/io'
import {FiMail} from 'react-icons/fi'
import { SiReact, SiVuedotjs} from 'react-icons/si'
import Image from 'next/image'
import styled from '@emotion/styled'

const AvatarProfile = ({profile}) => {
  return (
    <Box>
      <Box display='flex'>
        <Avatar size="2xl" name='Edwin Anciani Logo' src='/images/me.png'/>
        <Box p={5}>
          <Heading as='h3' size='lg'>Edwin Anciani</Heading>
          <Text fontSize='sm'>FullStack Develper</Text>
          <Stack justify="start" direction="row" spacing={5} mt={2}>
            <IoLogoAngular /> <SiReact /> <IoLogoJavascript /> <SiVuedotjs />
          </Stack>
        </Box>
      </Box>
      <Stack justify="center" direction="column" mt={10} spacing={4}>
        <Button size="md" leftIcon={<FiMail />} variant="solid">
          Contact Me
        </Button>
      </Stack>
    </Box>
  )
}

export default AvatarProfile
