import { Box, Stack, Divider } from '@chakra-ui/react'
import Article from '../../components/blog/posts/Article'
// import OnThisPost from '../../components/blog/posts/OnThisPost'
// import RelatedPosts from '../../components/blog/posts/RelatedPosts'
import ActionButtons from '../../components/blog/posts/ActionButtons'
import Breadcrumbs from '../../components/Breadcrumb'
import { firestore, postToJSON } from '../../lib/firebase'
import { getUsername } from '../../lib/config'
import { useContext, useEffect } from 'react'
import { PortfolioContext } from '../../lib/context'

const PostDetails = ({ post, portfolio}) => {
 const {actions} = useContext(PortfolioContext)
  useEffect(() => {
    if (!portfolio) {
      return;
    }
    actions.set(portfolio)
  }, [portfolio, actions])
  if(!portfolio) {
    return <>Portfolio not found</>
  }
  return (
    <>
      <Breadcrumbs paths={{current: {name: post?.data?.title}, past: {name: 'Posts', path: '/posts'}}} />
      <Stack as={`main`} justify={['space-between']} py={5} direction={['column', null, 'row']}  columns={[1, null, 3]} spacing={[10]}>
        <Box p={2} as='section' w={['100%', null, '60%']}>
          <Article post={post} />
        </Box>
        <Divider orientation={'vertical'} display={{base:'none', sm: 'none', md: 'none', lg: 'block'}}/>
        <Box p={2} display={`flex`} as={`aside`} flexDirection={['column']} w={['100%',  null, '20%']} alignItems={['start', null, 'start']}>
          <Stack direction={['column']} p={5} spacing={10}>
            {/* <OnThisPost highlights={post?.data.highlights}/> */}
            {/* <RelatedPosts related={post?.data.categories}/> */}
            <ActionButtons content={post}/>
          </Stack>
        </Box>
      </Stack>
    </>

  )
}
export async function getServerSideProps({req, params}) {
  const username = getUsername(req)
  const {slug } = params
  const ref = firestore.collection('posts').doc(slug)
  const post = postToJSON(await ref.get()) || null
  const path = ref.path
  if (!post) {
    return {
      notFound: true,
    };
  }
  try {
    const ref = firestore.collection('portfolios').doc(username) 
    const portfolio = postToJSON(await ref.get())
    return {
      props: { portfolio, post, path }
    };
  }  catch (err){
      return {
        notFound: true,
        props: {username}
      }
    }
}

export default PostDetails
