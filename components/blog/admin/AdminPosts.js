import { Box, Button, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { MdPostAdd } from 'react-icons/md'
import Link from 'next/link'
import { AiFillEye } from 'react-icons/ai'
import { getPosts } from '../../../lib/formio'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const AdminPosts = () => {
  const [posts, setPosts] = useState(null)
  const router = useRouter()
  useEffect(() => {
    if(!posts) {
      async function fetchData() {
        const request = await getPosts({})
        setPosts(request)
      }
      fetchData()
    }
  }, [posts])
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
        return <Link key={post._id} passHref href={`/admin/posts/${post.data.slug}`}>
          <Box maxW="100%" my={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Stack direction={['vertical']}>
              <Image src={post.data.banner || `https://via.placeholder.com/500`} alt="placeholder" width={'30%'} height="250px"/>
              <Stack p={3} >
                <Heading as={'h3'} maxH={'40%'} size={'md'} flexWrap={true} >{post.data.title}</Heading>
                <Text maxH={'30%'} fontSize="md" py={1} color={'gray.500'}>{post.data.description}</Text>
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
