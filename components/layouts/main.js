import Head from 'next/head'
import {Box, Container} from '@chakra-ui/react'
import Navbar from '../navbar'
import Footer from '../footer'

const Main = ({children, router}) => {
  return (
    <Box as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>blogrverse</title>
      </Head>
      <Navbar path={router.asPath} />
      <Container py={12} px={12} maxW='container.2xl'>
        {children}
      </Container>
      <Footer />
    </Box>
  )
}
export default Main
