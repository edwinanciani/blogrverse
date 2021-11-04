import Head from 'next/head'
import {Box, Container} from '@chakra-ui/react'
import Navbar from '../navbar'
import Footer from '../footer'
import useSWR from 'swr'
const fetcher = (url) => fetch(url).then((res) => res.json());

const Main = ({children, router}) => {
  const { data, error } = useSWR(
     "/api/portfolio",
     fetcher
   );
   if (error) return "An error has occurred.";
   const portfolio = data?.data;
  return (
    <Box as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>{portfolio?.pageTitle || 'HomePage'}</title>
      </Head>
      <Navbar path={router.asPath} portfolio={portfolio}/>
      <Container p={12} maxW='container.xl'>
        {children}
      </Container>
      <Footer portfolio={portfolio}/>
    </Box>
  )
}
export default Main
