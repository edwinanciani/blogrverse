import { Heading, Center, Container, Spacer, VStack, Text, Button } from '@chakra-ui/react'
import Banner from '../components/banner'
import {BsArrowRight} from 'react-icons/bs'
import {motion} from 'framer-motion'
import { getPortfolio } from '../lib/formio'
import InlineComponent from '../components/RenderComponents'

const Page = ({ portfolio }) => {
  if (!portfolio) {
    return (
      <>Error My frend</>
    )
  }
  const {data} = portfolio
  return (
    <Container maxW='container.xl'>
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
                <Text>{data.bannerText2} <span className="primary-text">{data.bannerText3}</span></Text>
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
                  return (<Heading as="h2">
                    {bullet.firstText} <span className="primary-text">{bullet.secondText}</span>
                  </Heading>)
                } else {
                  return (<Heading as="h2">
                    <span className="primary-text">{bullet.firstText} </span> {bullet.secondText}
                  </Heading>)
                }
              })
              }
            </VStack>
          </Center>

          <Spacer />
          <Center p={5} align='start'>
           <InlineComponent /> 
          </Center>
        </Container>
      </motion.div>
    </Container>
  )
}
export async function getStaticProps() {
  const portfolio = await getPortfolio()
  return {
    props: { portfolio }
  };
}

export default Page
