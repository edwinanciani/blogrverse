import { useState, useEffect} from 'react'
import dynamic from 'next/dynamic'
import { config, getPortfolio, savePortfolio } from '../../../lib/formio'
import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast'
import AvatarEdit from '../../../components/blog/admin/AvatarEdit'
import { useAuth } from '../../../lib/context'
import { useRouter } from 'next/router'

const FormComponent = dynamic(() => import('../../../components/Form'), {ssr: false})
const Portfolio = () => {
  // TODO: Avatar Images feature.
  const route = useRouter();
  const {username } = useAuth();
  const [portfolio, setPortfolio] = useState(null)
  useEffect(() => {
    console.log(portfolio);
    const fetchPortfolio = async () => {
      if(!route.isReady) return;
      if (!username) {
        console.log(route);
      }
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
  const onSubmit = async (submission) => {
    submission.data.username = username
    console.log(submission);
    await savePortfolio(submission)
    toast.success('Portfolio Updated!')
  }
  const onSubmitProfile = async (profile) => {
    console.log(profile)
    if(portfolio?.data) {
      portfolio.data.about = profile.data
      setPortfolio(portfolio)
      await savePortfolio(portfolio)
      toast.success('About updated')
    }
  }
  const onProfilechange = (profile) => {
    if(portfolio?.data) {
    console.log(portfolio);
      portfolio.data.about = profile.data;
      if(!profile?.data?.username) {
        portfolio.data.about.username = username;
      }
      setPortfolio(portfolio)
    }
  }
  return (
    <Container py={4}>
      <Tabs>
        <TabList>
          <Tab>Portforlio</Tab>
          <Tab>About</Tab>
          <Tab>Images</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            { typeof window !== "undefined"  ? <FormComponent data={portfolio} form={`${config.portfolio.form}`} onSubmit={onSubmit} /> : null}
          </TabPanel>
          <TabPanel>
            { typeof window !== "undefined"  ? <FormComponent data={{data:portfolio?.data?.about}} onChange={onProfilechange} form={`${config.profile.form}`} onSubmit={onSubmitProfile} /> : null}
          </TabPanel>
          <TabPanel>
            <AvatarEdit data={portfolio} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Toaster></Toaster>
    </Container>
  )
}

export default Portfolio