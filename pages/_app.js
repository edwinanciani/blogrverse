import {ChakraProvider} from '@chakra-ui/react'
import Layout from '../components/layouts/main'
import theme from '../lib/theme'
import Fonts from '../components/fonts'
import '../styles/global.css'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hook'
const Website = ({Component, pageProps, router}) => {
  const userData = useUserData()
  return (
    <UserContext.Provider value={userData}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Layout router={router}>
          <Component {...pageProps} key={router.route} />
        </Layout>
      </ChakraProvider>
    </UserContext.Provider>
  )
}
export default Website
