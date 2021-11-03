import Head from 'next/head'
import {Box, Flex} from '@chakra-ui/react'
import Navbar from '../navbar'
import Footer from '../footer'
const Main = ({children, router}) => {
  return (
    <Box as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Edwin Anciani - HomePage</title>
      </Head>
      <Navbar path={router.asPath} />
      <Flex w="100%" h="100%" size="full" pt={14}>
        {children}
      </Flex>
      <Footer />
    </Box>
  )
}
export default Main
