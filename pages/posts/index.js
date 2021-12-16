import {Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { firestore, postToJSON } from '../../lib/firebase'
import Feed from '../../components/blogrverse/Feed'
import { getUsername } from '../../lib/config'
import { useContext } from 'react'
import { PortfolioContext } from '../../lib/context'
import { useEffect } from 'react'


const Posts = ({portfolio, posts}) => {
  const {actions} = useContext(PortfolioContext)
  useEffect(() => {
    if (!portfolio) {
      return;
    }
    actions.set(portfolio)
  }, [portfolio])
  if(!portfolio) {
    return <>Portfolio not found</>
  }
  console.log(posts);
  return (
    <>
     <Head>
       <title>My Posts</title>
     </Head>
      <Heading mt={15} as={'h2'}>Posts</Heading>
      <motion.div
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{ ease: "easeIn", duration: 0.5 }}>
          <Feed data={posts} />
      </motion.div>
    </>
  )
}
export async function getServerSideProps({req}) {
  const username = getUsername(req)
  const postsQuery = firestore.collection('posts')
  .where('author', '==', username)
  .where('public', '==', true)
  .orderBy('created', 'desc')
  .limit(10)
  const posts = (await postsQuery.get()).docs.map(postToJSON)
  try {
    const ref = firestore.collection('portfolios').doc(username) 
    const portfolio = postToJSON(await ref.get())
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
