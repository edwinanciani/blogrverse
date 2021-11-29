import { Box, Button, FormControl, FormLabel, Grid, Heading, Stack, Switch, Text } from '@chakra-ui/react'
import Breadcrumbs from '../../../components/Breadcrumb'
import dynamic from 'next/dynamic'
import { config, getPostBySlug } from '../../../lib/formio'
import 'formiojs/dist/formio.full.css'
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { useState } from 'react'
import RenderComponents from '../../../components/blog/posts/RenderComponents'

const Form = dynamic(() => import('@formio/react').then(module => module.Form), {ssr: false})

const AdminPostDetails = ({post}) => {
  const [preview, setPreview] = useState(null)
  const [submission, setSubmission] = useState(post)
  if(!post) {
    return (<Heading>Post Not Found</Heading>)
  }
  const onChangeHandler = (event) => {
    console.log(event)
    if (event.changed) {
      submission.data = event.data;
    }
    console.log(submission)
  }
  const submitForm = (event) => {
    setSubmission(event);
  }
  return (
    <Box py={12}>
      <Breadcrumbs paths={{current: {name: post.data.title}, past: {name: 'Admin Posts', path: '/admin'}}} />
      <Grid templateRows="repeat(1, 1fr)"
            templateColumns="repeat(1, 3fr 1fr)"
            gap={0}>
        <Box w={'80%'} px={2} py={2}>
          <Heading as={'h2'} py={2} size={'md'}>{post.data.title}</Heading>
          {
            !preview ?
            typeof window !== "undefined" && submission ? <Form submission={submission} onChange={onChangeHandler} src={config.posts.form} onSubmit={submitForm } /> : <Text>Form not Loaded</Text>
              : <RenderComponents post={submission.data} />
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
              >
                Edit
              </Button>
              <Button
                mt={4}
                leftIcon={<AiOutlineEye />}
                colorScheme="teal"
                isLoading={false}
                type="submit"
                onClick={() => setPreview(!preview)}
              >
                Preview
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

export async function getServerSideProps({params}) {
  const {slug} = params
  const post = (await getPostBySlug(slug)) || null
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post }
  }
}

export default AdminPostDetails
