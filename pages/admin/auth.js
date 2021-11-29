import {
  Box,
  useColorModeValue,
  SimpleGrid,
  Button,
  Heading,
  Text,
  Image,
  Stack,
  FormLabel,
  Input,
  FormControl
} from '@chakra-ui/react'
import { FaLock } from 'react-icons/fa'
import Head from 'next/head'
import { auth } from '../../lib/firebase'
import { useContext } from 'react'
import { UserContext } from '../../lib/context'
import { toast, Toaster } from 'react-hot-toast'
import {useState } from 'react'

const AuthPage = () => {
  const logoImage = `/images/a${useColorModeValue('dark', '')}.svg`
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {user} = useContext(UserContext)
  const emailHandler = (ev) => {
    setEmail(ev.target.value)
  }
  const passwordHandler = (ev) => {
    setPassword(ev.target.value)
  }
  return (
    <>
      <Head>
        <title>Admin Login</title>
      </Head>
      <Box
        bg={useColorModeValue('gray.50', 'inherit')}
        minH="100vh"
        py="12"
        px={{ base: '2', lg: '8' }}
      >
        <Image mx="auto" h="8" mb={{ base: '10', md: '20' }} src={logoImage} />
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
        Sign in
      </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
        </Text>
        <Box  bg={useColorModeValue('white', 'gray.700')}
             py="8"
             px={{ base: '4', md: '10' }}
             shadow="base"
             rounded={{ sm: 'lg' }}>
        <Box maxW="md" mx="auto">
          <SimpleGrid mt="6" columns={1} spacing="3">
            {
              user ?
                <>
                  <Button color={'primary.200'} variant="outline" onClick={() => auth.signOut()}>
                    <Text >Log Out</Text> <FaLock />
                  </Button>
                </>
                :
                <>
                 <Stack spacing="6">
                   <FormControl>
                     <FormLabel>Email address</FormLabel>
                     <Input id={`email`} name="email" value={email} onChange={emailHandler} type="email" required />
                     <FormLabel>Password</FormLabel>
                     <Input
                       id={`password`}
                       name="password"
                       type={'password'}
                       value={password}
                       autoComplete="current-password"
                       required
                       onChange={passwordHandler}
                     />
                   </FormControl>

                   <Button type="submit" color={'primary.200'} size="lg" fontSize="md" onClick={() => SignIn(email, password)}>
                     Sign in
                   </Button>
                 </Stack>
                </>
            }
            <Toaster/>
          </SimpleGrid>
        </Box>
        </Box>
      </Box>
    </>
  )
}
const SignIn = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password)
  } catch (err) {
    toast.error(err.message.replace('Firebase:', ''))
  }
}

export default AuthPage
