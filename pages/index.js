import { Heading, Center, Container, Spacer, VStack, Text, Button } from '@chakra-ui/react'
import Banner from '../components/banner'
import Loading from '../components/portfolio/loading'
import {BsArrowRight} from 'react-icons/bs'
import {motion} from 'framer-motion'
import useSWR from 'swr'
const fetcher = (url) => fetch(url).then((res) => res.json());

const Page = () => {
  const { data, error } = useSWR(
     "/api/portfolio",
     fetcher
   );
   if (error) return "An error has occurred.";
   if (!data) return <Loading />;
   const portfolio = data.data;
   console.log(portfolio);
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
              <Text>{portfolio.bannerText1}</Text>
              <Text>{portfolio.bannerText2} <span className="primary-text">{portfolio.bannerText3}</span></Text>
            </Heading>
            <Text>{portfolio.shortDescription}</Text>
          </VStack>
        </Center>
        <Spacer />
        <Banner />
        <Spacer />
        <Center p={5} align='start'>
          <VStack align="start">
            { portfolio.interestPoints.map((bullet) =>
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
          <Button rightIcon={<BsArrowRight />} variant="outline">
            Contact Me
          </Button>
        </Center>
      </Container>
    </motion.div>
    </Container>
  )
}


// export async function getServerSideProps(context) {
//   console.log(context);
// }
export default Page;
