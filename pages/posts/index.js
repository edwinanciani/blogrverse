import { getPosts } from '../../lib/formio'
import {Heading, SimpleGrid } from '@chakra-ui/react'
import Head from 'next/head'
import PostCard from '../../components/blog/posts/PostCard'
import { motion } from 'framer-motion'

const Posts = ({posts}) => {
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
          <SimpleGrid py={10} px={0} columns={[1, null, 3]} spacing={[10]}>
            {posts.map((post) => {
              return (
                <>
                  <PostCard key={post._id} post={post} />
                </>
              )
            })}
        </SimpleGrid>
      </motion.div>
    </>
  )
}
export async function getStaticProps() {
  const posts = (await getPosts({limit: 10})) || []
  return {
    props: { posts }
  }
}
export default Posts
