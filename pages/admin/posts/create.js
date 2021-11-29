import { Box, Grid, Text } from '@chakra-ui/react'
import Breadcrumbs from '../../../components/Breadcrumb'
import { useState } from 'react'
import { Title } from '../../../components/blog/admin/Plugins/Title'
import { Banner } from '../../../components/blog/admin/Plugins/Banner'
import { Action } from '../../../components/blog/admin/Plugins/Action'
import Editor from '../../../components/blog/admin/Editor'
import { Description } from '../../../components/blog/admin/Plugins/Description'

const AdminPostDetails = () => {
  const [submission, setSubmission] = useState({data: {}})
  const getTitle = (event) => {
    console.log(event);
    submission.data.title = event
    setSubmission(submission)
  }
  const getDescription = (event) => {
    submission.data.description = event
    setSubmission(submission)
  }
  const getContent = (event) => {
    submission.data.content = JSON.parse(event)
    setSubmission(submission)
  }
  return (
    <Box py={12}>
      <Breadcrumbs paths={{current: {name: 'Creating Post'}, past: {name: 'Admin Posts', path: '/admin'}}} />
      <Grid templateRows="repeat(1, 1fr)"
            templateColumns="repeat(1, 3fr 1fr)"
            gap={0}>

        <Box w={'80%'} px={2} py={2}>
          <Title onTitle={getTitle}></Title>
          <Description onDescription={getDescription} />
          <Banner></Banner>
          {
              typeof window !== "undefined" ? <Editor content={getContent} />: <Text>Editor not Loaded</Text>
          }
        </Box>
        <Box w={'100%'} p={6}>
          {/*Preview*/}
          {/*Published*/}
          {/*Edit*/}
          <Box>
            <Action data={submission} />
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default AdminPostDetails
