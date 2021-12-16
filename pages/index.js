import { Heading, Center, Container, Spacer, VStack, Text, HStack } from '@chakra-ui/react'
import Banner from '../components/banner'
import {motion} from 'framer-motion'
import { firestore, postToJSON } from '../lib/firebase'
import { getUsername } from '../lib/config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect} from 'react'
import { PortfolioContext } from '../lib/context'
const Page = ({ portfolio }) => {
  const router = useRouter()
  const {actions} = useContext(PortfolioContext)
  useEffect(() => {
    if (!portfolio) {
      router.push('/universe')
    }
    actions.set(portfolio)
  }, [portfolio, actions])
  if(!portfolio) {
    return <>Traveling to the blogrverse</>
  }
  const data = portfolio
  return (
    <Container maxW='container.xl'>
    <Head>
      <title>{data.pageTitle}</title>
    </Head>
      <motion.div
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{ ease: "easeIn", duration: 0.5 }}>
        <Container
          display='flex'
          p={2}
          style={{flexWrap: 'wrap'}}
          maxW='container.xl'
          wrap='wrap'
          align='stretch'
          justify='space-between'>
          <Center p={5} align='start'>
            <VStack align="start">
              <Heading variant="page-title">
                <Text>{data.bannerText1}</Text>
               <HStack> <Text>{data.bannerText2}</Text> <Text  color='primary.100'>{data.bannerText3}</Text></HStack>
              </Heading>
              <Text>{data.shortDescription}</Text>
            </VStack>
          </Center>
          <Spacer />
          <Banner />
          <Spacer />
          <Center p={5} align='start'>
            <VStack align="start">
              { data.interestPoints.map((bullet) =>
              {
                if (bullet.colorSelect === 'secondText') {
                  return (<Heading as="h2" display={'flex'}>
                    <HStack>
                     <span> {bullet.firstText}</span> <Text color={'primary.100'}>{bullet.secondText}</Text>
                    </HStack>
                  </Heading>)
                } else {
                  return (<Heading as="h2">
                    <HStack>
                      <Text color={'primary.100'}>{bullet.firstText} </Text> <span>{bullet.secondText}</span>
                    </HStack>
                  </Heading>)
                }
              })
              }
            </VStack>
          </Center>

          <Spacer />
          <Center p={5} align='start'>
              Latest Posts or works
          </Center>
        </Container>
      </motion.div>
    </Container>
  )
}
export async function getServerSideProps({req}) {
  const username = getUsername(req)
  let redirect = false
  if (username === 'redirectHome') {
   redirect = true
   console.log(username);
   return {
     props: {
       portfolio: null,
       redirect
     }
   }
  }
  try {
    const ref = firestore.collection('portfolios').doc(username) 
    const portfolio = postToJSON(await ref.get())
    return {
      props: { portfolio, redirect }
    };
  }
  catch (err){
    return {
      notFound: true,
      props: {username}
    }
  }
}

export default Page
