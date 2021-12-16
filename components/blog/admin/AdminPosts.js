import { Box, Button, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { MdPostAdd } from 'react-icons/md'
import Link from 'next/link'
import { AiFillEye } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UserContext } from '../../../lib/context'
import {firestore, postToJSON} from '../../../lib/firebase'
const AdminPosts = () => {
  const {username} = useContext(UserContext)
  const [posts, setPosts] = useState(null)
  const router = useRouter()
  useEffect(() => {
    if(username && !posts) {
      async function fetchData() {
       const postsQuery = firestore.collection('posts')
      .where('author', '==', username)
      .orderBy('created', 'desc')
      .limit(10)
      const posts = (await postsQuery.get()).docs.map(postToJSON)
      console.log(posts);
      setPosts(posts)
      }
      fetchData()
    }
  }, [posts, username])
  if(!posts || posts.length === 0) {
    return <Box w="100%">
      <Heading py={6}>There are no posts  <Button leftIcon={<MdPostAdd />}>
        Create New Post
      </Button></Heading>
    </Box>
  }
  return (
    <Box w="100%">
      <Heading py={6}>Posts  <Button onClick={() => router.push('/admin/posts/create')} leftIcon={<MdPostAdd />}>
        Create New Post
      </Button></Heading>
      {posts.map(post => {
        return <Link key={post.slug} passHref href={`/admin/posts/${post.slug}`}>
          <Box maxW="100%" my={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Stack direction={['vertical']}>
              <Image src={post.banner?.urls.regular  } alt={post.banner?.alt_description} width={'30%'} height="250px"/>
              <Stack p={3} >
                <Heading as={'h3'} maxH={'40%'} size={'md'} flexWrap={true} >{post.title}</Heading>
                <Text maxH={'30%'} fontSize="md" py={1} color={'gray.500'}>{post.description}</Text>
                <Text fontSize="sm" maxH={'30%'} py={1} display={'flex'} alignItems={'center'} color={'gray.500'}><AiFillEye /> <Text p={2}> 14 Views</Text></Text>
              </Stack>
            </Stack>
          </Box>
        </Link>
      })}
    </Box>
  )
}

export default AdminPosts
