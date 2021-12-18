import dynamic from 'next/dynamic'
import { debounce } from 'lodash'
import { config } from '../../../lib/formio'
import { useCallback, useContext, useEffect  } from 'react'
import { firestore, serverTimestamp } from '../../../lib/firebase'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { UserContext } from '../../../lib/context'

const FormComponent = dynamic(() => import('../../../components/Form'), {ssr: false})

const CreatePortfolio = () => {
  const {user, username} = useContext(UserContext)
  const router = useRouter()
  useEffect(() => {
    if(username) {
      router.push(`/admin/portfolio/${username}`)
    }
  })
  const onChange = (event) => {
    if (event.data.username?.length > 3) {
    checkUsername(event.data.username) 
    }
  }
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        if(!exists) {
          toast.success('valid user')
        } else {
          toast.error('Username already exists')
        }
      }
    }, 500),
    []
  );
  const onSave = async (submission) => {
    const portfolioRef = firestore.collection('portfolios').doc(submission.data.username)
    const usernameRef = firestore.collection('usernames').doc(submission.data.username)
    const userRef = firestore.collection('users').doc(user.uid)
    const userData = (await userRef.get()).data()
    await userRef.update({...userData, username: submission.data.username})
    await portfolioRef.set({...submission.data.portfolio.data, username: submission.data.username, created: serverTimestamp(), modified: serverTimestamp()})
    await usernameRef.set({uid: user.uid})
    toast.success('Username&Portfolio Created')
    router.push(`/admin/portfolio/${submission.data.username}`)
  }
  return (
    <div>
     <FormComponent form={config.portfolio.create}  onChange={onChange} onSubmit={onSave}/> 
     <Toaster />
    </div>
  )
}

export default CreatePortfolio