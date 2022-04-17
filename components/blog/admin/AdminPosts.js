import { Box, Button, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { MdPostAdd } from 'react-icons/md'
import Link from 'next/link'
import { AiFillEye } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../../lib/context'
import { getPostsByUsername } from '../../../lib/formio'
const AdminPosts = () => {
  const {username} = useAuth()
  const [posts, setPosts] = useState(null)
  const router = useRouter()
  useEffect(() => {
    console.log(username);
    if(username && !posts) {
      async function fetchData() {
        const posts = await getPostsByUsername(username);
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
      {posts.map(({data}) => {
        return <Link key={data.slug} passHref href={`/admin/posts/${data.slug}`}>
          <Box maxW="100%" my={5} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Stack direction={['vertical']}>
              <Image src={data.banner?.urls?.regular  } alt={data.banner?.alt_description} width={'30%'} height="250px"/>
              <Stack p={3} >
                <Heading as={'h3'} maxH={'40%'} size={'md'} flexWrap={true} >{data.title}</Heading>
                <Text maxH={'30%'} fontSize="md" py={1} color={'gray.500'}>{data.description}</Text>
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
