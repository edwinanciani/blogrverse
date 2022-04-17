import { Box, Grid, Text } from '@chakra-ui/react'
import Breadcrumbs from '../../../components/Breadcrumb'
import { useContext, useEffect, useState } from 'react'
import { Title } from '../../../components/blog/admin/Plugins/Title'
import { Banner } from '../../../components/blog/admin/Plugins/Banner'
import { Action } from '../../../components/blog/admin/Plugins/Action'
import Editor from '../../../components/blog/admin/Editor'
import { Description } from '../../../components/blog/admin/Plugins/Description'
import { useAuth } from '../../../lib/context'
import { useRouter } from 'next/router'
import { getPortfolio } from '../../../lib/formio'

const AdminPostDetails = () => {
  const route = useRouter();
  const [portfolio, setPortfolio] = useState(null)
  const {username } = useAuth();
  const [submission, setSubmission] = useState({data: {}})
  useEffect(() => {
    console.log(portfolio);
    const fetchPortfolio = async () => {
      if(!route.isReady) return;
      console.log(username);
      const portfolioData = await getPortfolio(username)
      console.log(portfolioData);
      if(portfolioData.length > 0) {
        if(!portfolioData[0].data.about) {
          portfolioData[0].data.about = {username}
        }
        portfolio = portfolioData[0]
        setPortfolio(portfolioData[0])
      } else {
        setPortfolio({data:{username, about:{data:username}}})
      }
      return portfolio
    }
    fetchPortfolio()
    return portfolio
  }, [route.isReady])
  const getTitle = (event) => {
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
  const getBanner = (banner) => {
    submission.data.banner = banner
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
          <Banner getImage={getBanner}></Banner>
          {
              typeof window !== "undefined" ? <Editor content={getContent} />: <Text>Editor not Loaded</Text>
          }
        </Box>
        <Box w={'100%'} p={6}>
          {/*Preview*/}
          {/*Published*/}
          {/*Edit*/}
          <Box>
            <Action data={submission} portfolio={portfolio} />
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default AdminPostDetails
