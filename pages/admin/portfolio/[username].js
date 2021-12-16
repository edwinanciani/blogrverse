import { useRouter } from 'next/router'
import {useContext, useState, useEffect} from 'react'
import { UserContext } from '../../../lib/context'
import dynamic from 'next/dynamic'
import { config } from '../../../lib/formio'
import { firestore, postToJSON } from '../../../lib/firebase'
import { Box, Container } from '@chakra-ui/react'

const FormComponent = dynamic(() => import('../../../components/Form'), {ssr: false})
const Portfolio = () => {
  const route = useRouter()
  const {user, username} = useContext(UserContext)
  const [portfolio, setPortfolio] = useState(null)
  useEffect(() => {
    if(!user &&  !username){
      return 'Not User'
    }
    const getPortfolio = async () => {
      if (!username) {return;}
      const ref = firestore.collection('portfolios').doc(username)
      const portfolioData = (await ref.get()).data(postToJSON)
      setPortfolio(portfolioData)
    }
    getPortfolio()
    return {username, user}
  }, [user, username])
  const onSubmit = async (submission) => {
    console.log(submission);
    const ref = firestore.collection('portfolios').doc(route.query.username)
    const updated = await ref.update(submission.data)
    console.log(updated);
  }
  return (
    <Container>
     { typeof window !== "undefined"  ? <FormComponent data={portfolio} form={`${config.portfolio.form}`} onSubmit={onSubmit} /> : null}
    </Container>
  )
}

export default Portfolio