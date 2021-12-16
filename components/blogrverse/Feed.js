import { Box } from "@chakra-ui/layout";
import FeedItem from "./FeedItem"
import { Spinner, Button } from "@chakra-ui/react"
import { useState } from "react"
import {firestore, fromMillis } from '../../lib/firebase'
const LIMIT = 10
const Feed = ({data, category}) => {
  const [postsEnd, setPostsEnd] = useState(false)
  const [posts, setPosts] = useState(data)
  const [loading, setLoading] = useState(false)
  const getMorePosts = async () => {
    setLoading(true)
    const last = posts[posts.length -1]
    const cursor = typeof last.created === 'number' ? fromMillis(last.created) : last.created

    const query = firestore.collection('posts')
    .where('public', '==', true)
    .orderBy('created', 'desc')
    .startAfter(cursor)
    .limit(LIMIT)
    if(category) {
      query.where('categories', 'array-contains', category)
    }
    const newPosts = (await query.get()).docs.map((doc) => doc.data())
    setPosts(posts.concat(newPosts))
    setLoading(false)
    if(newPosts.length < LIMIT) {
      setPostsEnd(true)
    }
  }
  return (
    <Box w="100%">
      {
        posts.map((post) => {
          // Item
          return <Box p={4} w="100%" alignItems="start" key={post.slug}>
            <FeedItem post={post}/>
          </Box>
        })
      }
      {posts.length < LIMIT ? null :  <Box w='100%' py={2} >
        {!loading && !postsEnd && <Button onClick={() => getMorePosts()}>Load More</Button>} 
        {loading ? <Spinner />: null}
        {postsEnd && 'You have reached the end!'}
      </Box> }
    </Box>
  )
}

export default Feed