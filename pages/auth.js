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
  FormControl,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Container
} from '@chakra-ui/react'
import { FaLock } from 'react-icons/fa'
import Head from 'next/head'
import { auth, firestore, serverTimestamp } from '../lib/firebase'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { toast, Toaster } from 'react-hot-toast'
import {useState } from 'react'
import { useRouter } from 'next/router'

const AuthPage = () => {
  const logoImage = `/images/a${useColorModeValue('dark', '')}.svg`
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {user} = useContext(UserContext)
  const emailHandler = (ev) => {
    setEmail(ev.target.value)
  }
  const passwordHandler = (ev) => {
    setPassword(ev.target.value)
  }
  const SignUp = async (email, password) => {
    try {
      const userCreds = await auth.createUserWithEmailAndPassword(email, password)
      console.log(userCreds);
      const ref = firestore.collection('users').doc(userCreds.user.uid)
      await ref.set({modified: serverTimestamp(), created: serverTimestamp()})
      router.push('/admin/portfolio/create')
    } catch (err) {
      toast.error(err.message.replace('Firebase:', ''))
    }
  }
  return (
    <Container bg={useColorModeValue('gray.50', 'inherit')}
    minH="100vh"
    py="12"
    px={{ base: '2', lg: '8' }}>
    {
      user ?
        <>
          <Button w={'100%'} color={'primary.200'} variant="outline" onClick={() => auth.signOut()}>
            <Text >Log Out</Text> <FaLock />
          </Button>
        </>
        :
        <Tabs isFitted variant="soft-rounded">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>

        <Head>
          <title>Admin Login</title>
        </Head>
        <Box >
          <Image mx="auto" h="8" mb={{ base: '10', md: '20' }} src={logoImage} alt="logo" />
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in
        </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          </Text>
          <Box>
          <Box maxW="md" mx="auto">
            <SimpleGrid mt="6" columns={1} spacing="3">
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

                    <Button type="submit" color={'primary.200'} size="lg" fontSize="md" onClick={() => SignIn(email, password).then(()=>router.push('/universe') )}>
                      Sign in
                    </Button>
                  </Stack>
                  </>
              <Toaster/>
            </SimpleGrid>
          </Box>
          </Box>
        </Box>
            </TabPanel>
            <TabPanel>
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

                <Button type="submit" color={'primary.200'} size="lg" fontSize="md" onClick={() => SignUp(email, password)}>
                  Sign up
                </Button>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
    }
    </Container>
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
