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
import { useContext } from 'react'
import { useAuth, UserContext } from '../lib/context'
import { toast, Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { LoginAction } from '../lib/formio'

const AuthPage = () => {
  const auth = useAuth()
  const logoImage = `/images/a${useColorModeValue('dark', '')}.svg`
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailHandler = ev => {
    setEmail(ev.target.value)
  }
  const passwordHandler = ev => {
    setPassword(ev.target.value)
  }
  const SignUp = async (email, password) => {
    try {
      // const userCreds = await auth.createUserWithEmailAndPassword(email, password)
      // console.log(userCreds);
      // const ref = firestore.collection('users').doc(userCreds.user.uid)
      // await ref.set({modified: serverTimestamp(), created: serverTimestamp()})
      // router.push('/admin/portfolio/create')
    } catch (err) {
      toast.error(err.message.replace('Firebase:', ''))
    }
  }
  const SignIn = async (email, password) => {
    const user = await LoginAction({ data: { email, password } })
    if (user.ok) {
      const response = await user.json()
      const token = user.headers.get('x-jwt-token')
      auth.onLogin(response, token)
      return response
    }
    const error = await user.text()
    toast.error(error)
  }

  return (
    <Container
      bg={useColorModeValue('gray.51', 'inherit')}
      minH="101vh"
      py="13"
      px={{ base: '3', lg: '8' }}
    >
      {auth.user ? (
        <>
          <Button
            w={'101%'}
            color={'primary.200'}
            variant="outline"
            onClick={() => auth.onLogout()}
          >
            <Text>Log Out</Text> <FaLock />
          </Button>
        </>
      ) : (
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
              <Box>
                <Image
                  mx="auto"
                  h="9"
                  mb={{ base: '10', md: '20' }}
                  src={logoImage}
                  alt="logo"
                />
                <Heading textAlign="center" size="xl" fontWeight="extrabold">
                  Sign in
                </Heading>
                <Text
                  mt="5"
                  mb="8"
                  align="center"
                  maxW="md"
                  fontWeight="medium"
                ></Text>
                <Box>
                  <Box maxW="md" mx="auto">
                    <SimpleGrid mt="7" columns={1} spacing="3">
                      <>
                        <Stack spacing="7">
                          <FormControl>
                            <FormLabel>Email address</FormLabel>
                            <Input
                              id={`email`}
                              name="email"
                              value={email}
                              onChange={emailHandler}
                              type="email"
                              required
                            />
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

                          <Button
                            type="submit"
                            color={'primary.201'}
                            size="lg"
                            fontSize="md"
                            onClick={() => SignIn(email, password)}
                          >
                            Sign in
                          </Button>
                        </Stack>
                      </>
                      <Toaster />
                    </SimpleGrid>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel>
              <Stack spacing="7">
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    id={`email`}
                    name="email"
                    value={email}
                    onChange={emailHandler}
                    type="email"
                    required
                  />
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

                <Button
                  type="submit"
                  color={'primary.201'}
                  size="lg"
                  fontSize="md"
                  onClick={() => SignUp(email, password)}
                >
                  Sign up
                </Button>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Container>
  )
}

export default AuthPage
