import { useRouter } from 'next/router'
import {useContext, useState, useEffect} from 'react'
import { UserContext } from '../../../lib/context'
import dynamic from 'next/dynamic'
import { config } from '../../../lib/formio'
import { firestore, postToJSON } from '../../../lib/firebase'
import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import toast, { Toaster } from 'react-hot-toast'
import AvatarEdit from '../../../components/blog/admin/AvatarEdit'

const FormComponent = dynamic(() => import('../../../components/Form'), {ssr: false})
const Portfolio = () => {
  const route = useRouter()
  const {user, username} = useContext(UserContext)
  const [portfolio, setPortfolio] = useState(null)
  useEffect(() => {
    if(!user && !username){
      return console.log('Not User') 
    }
    console.log(portfolio);
    const getPortfolio = async () => {
      if (!username || portfolio) {return;}
      const ref = firestore.collection('portfolios').doc(username)
      const portfolioData = (await ref.get()).data(postToJSON)
      setPortfolio(portfolioData)
      return portfolio
    }
    getPortfolio()
    return portfolio
  }, [user, username, portfolio])
  const onSubmit = async (submission) => {
    const ref = firestore.collection('portfolios').doc(route.query.username)
    await ref.update(submission.data)
    toast.success('Portfolio Updated!')
  }
  const onSubmitProfile = async (profile) => {
    console.log(profile);
    console.log(portfolio);
   const ref = firestore.collection('portfolios').doc(route.query.username)
   portfolio.about = profile.data
   await ref.update(portfolio)
   toast.success('About updated')
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
            { typeof window !== "undefined"  ? <FormComponent data={portfolio?.about} form={`${config.profile.form}`} onSubmit={onSubmitProfile} /> : null}
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