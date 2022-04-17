import { Heading, Center, Container, Spacer, VStack, Text, HStack, Stack } from '@chakra-ui/react'
import Banner from '../components/banner'
import {motion} from 'framer-motion'
import { getUsername } from '../lib/config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect} from 'react'
import { PortfolioContext } from '../lib/context'
import { config, deliveryGuy, getPortfolio } from '../lib/formio'
import LatestActivity from '../components/portfolio/LatestActivity'
const Page = ({ portfolio, posts}) => {
  const router = useRouter()
  const {actions} = useContext(PortfolioContext)
  useEffect(() => {
    if (!portfolio) {
      router.push('/universe')
    }
    console.log(portfolio);
    actions.set(portfolio)
  }, [portfolio, actions])
  if(!portfolio) {
    return <>Traveling to the blogrverse</>
  }
  const {data} = portfolio
  return (
    <Container maxW='container.xl'>
    <Head >
      <title>{data?.pageTitle}</title>
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
                <Text>{data?.bannerText1}</Text>
               <HStack> <Text>{data?.bannerText2}</Text> <Text  color='primary.100'>{data?.bannerText3}</Text></HStack>
              </Heading>
              <Text>{data?.shortDescription}</Text>
            </VStack>
          </Center>
          <Spacer />
          {/* TODO: IMAGE BANNER */}
          <Banner />
          <Spacer />
          <Center p={5} align='start'>
            <VStack align="start">
              { data?.interestPoints.map((bullet, i) =>
              {
                if (bullet.colorSelect === 'secondText') {
                  return (<Heading key={i} as="h2" display={'flex'}>
                    <HStack>
                     <span> {bullet.firstText}</span> <Text color={'primary.100'}>{bullet.secondText}</Text>
                    </HStack>
                  </Heading>)
                } else {
                  return (<Heading key={i} as="h2">
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
          <Stack p={5} align='start'>
              <LatestActivity posts={posts} />
          </Stack>
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
   return {
     props: {
       portfolio: null,
       redirect
     }
   }
  }
  try {
    const posts = await deliveryGuy('GET', config.posts.resource, null, `?limit=3&data.username=${username}`, true)
    const data = await getPortfolio(username);
    const portfolio = data[0]
    return {
      props: { portfolio, posts, redirect }
    };
  }
  catch (err){
    console.log(err);
    return {
      notFound: true,
      props: {username}
    }
  }
}

export default Page
