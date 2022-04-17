import {Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Feed from '../../components/blogrverse/Feed'
import { getUsername } from '../../lib/config'
import { useContext } from 'react'
import { PortfolioContext } from '../../lib/context'
import { useEffect } from 'react'
import { config, deliveryGuy, getPortfolio } from '../../lib/formio'


const Posts = ({portfolio, posts}) => {
  const {actions} = useContext(PortfolioContext)
  useEffect(() => {
    if (!portfolio) {
      return;
    }
    actions.set(portfolio)
  }, [portfolio, actions])
  if(!portfolio) {
    return <>Portfolio not found</>
  }
  return (
    <>
     <Head>
       <title>{portfolio?.data.pageTitle + "'s" || 'My'} Posts</title>
     </Head>
      <Heading mt={15} as={'h2'}>Posts</Heading>
      <motion.div
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{ ease: "easeIn", duration: 0.5 }}>
          <Feed portfolio={portfolio} data={posts} />
      </motion.div>
    </>
  )
}
export async function getServerSideProps({req}) {
  const username = getUsername(req)
  const posts = await deliveryGuy('GET', config.posts.resource, null, `?limit=${10}&data.username=${username}`, true)
  const data = await getPortfolio(username);
  const portfolio = data[0]
  try {
    return {
      props: { portfolio, posts }
    };
  }  catch (err){
      return {
        notFound: true,
        props: {username}
      }
    }
}
export default Posts
