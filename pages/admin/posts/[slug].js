import {HStack, Text, Link, Box, Button, FormControl, FormLabel, Grid, Heading, Stack, Switch, Image } from '@chakra-ui/react'
import Breadcrumbs from '../../../components/Breadcrumb'
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import Editor from '../../../components/blog/admin/Editor'
import { Title } from '../../../components/blog/admin/Plugins/Title'
import { Description } from '../../../components/blog/admin/Plugins/Description'
import toast from 'react-hot-toast'
import { Banner } from '../../../components/blog/admin/Plugins/Banner'
import {useRouter} from 'next/router'
import { getPostBySlug, sendPost } from '../../../lib/formio'

const AdminPostDetails = () => {
  const {query} = useRouter()
  const [preview, setPreview] = useState(true)
  const [submission, setSubmission] = useState(null)
  useEffect(() => {
    if(!submission && query.slug) {
      async function fetchData() {
      const post = await getPostBySlug(query.slug)
      setSubmission(post)
      }
      fetchData()
    }
  }, [submission, query.slug])
  if(!submission) {
    return (<Heading>Post Not Found</Heading>)
  }
  const post = submission
  const getContent = (content) => {
    submission.data.content = content
    setSubmission(submission)
  }
  const getTitle = (title) => {
    submission.data.title = title
    console.log(title);
    setSubmission(submission)
  }
  const getDescription = (desc) => {
    console.log(desc, submission);
    submission.data.description = desc
    setSubmission(submission)
  }
  const savePost = async () => {
    console.log(submission);
    const saved = await sendPost(submission) 
    if(saved) {
      toast.success('Post has been edited!')
    }
  }
  const getBanner = (banner) => {
    submission.banner = banner
    setSubmission(submission)
  }
  return (
    <Box py={12}>
      <Breadcrumbs paths={{current: {name: post.data?.title}, past: {name: 'Admin Posts', path: '/admin'}}} />
      <Grid templateRows="repeat(1, 1fr)"
            templateColumns="repeat(1, 3fr 1fr)"
            gap={0}>
        <Box w={'80%'} px={2} py={2}>
          {!preview ?<>
            <Title edit={preview} onTitle={getTitle} title={post.data?.title}/>
            <Description edit={preview} onDescription={getDescription} description={post.data?.description} />
            <Banner setImage={post.data?.banner ? post.data?.banner : null} getImage={getBanner}/>
          </>:
          <>
          <Heading as={'h1'} py={10} >{post.data?.title}</Heading>
          <Heading as={'h3'} pb={10} color='gray' colorScheme="gray" size={'sm'}>{post.data?.description}</Heading>
          { post.data?.banner?<><Box borderRadius={10} overflow={'hidden'}><Image src={post.data.banner?.urls.regular} w={'100%'} h={'100%'} alt={post.data?.banner?.alt_description}/>
           </Box>
      <HStack alignItems="center" mb={8} justify="center">
      <Text color="gray.400">By {`${post.data?.banner.user.first_name} ${post.data?.banner.user.last_name}`}</Text>
      <Link href={post.data?.banner.user.portfolio_url}>{`@${post.data?.banner.user.username}`}</Link>
    </HStack></>: null}
          </>}

          {
            <Editor content={getContent} setContent={post.data?.content} edit={preview}/>
          }
        </Box>
        <Box w={'100%'} p={6}>
          <Box>
            <Heading as={'h3'} size={'md'}>Actions</Heading>
            <Stack w={'50%'} spacing={4}>
              <Button
                mt={4}
                leftIcon={<AiOutlineEdit />}
                colorScheme="teal"
                isLoading={false}
                type="submit"
                onClick={() => setPreview(false)}
              >
                Edit
              </Button>
              <Button
                mt={4}
                leftIcon={<AiOutlineEye />}
                colorScheme="teal"
                isLoading={false}
                type="submit"
                onClick={() => setPreview(true)}
              >
                Preview
              </Button>
              <Button
                mt={4}
                leftIcon={<AiOutlineEye />}
                colorScheme="blue"
                variant='outline'
                isLoading={false}
                type="submit"
                onClick={() => savePost()}
              >
                Save Post
              </Button>
            </Stack>
            <FormControl py={6} display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Published
              </FormLabel>
              <Switch id="email-alerts" />
            </FormControl>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}


export default AdminPostDetails
