import { Box, Stack, Divider } from '@chakra-ui/react'
import Article from '../../components/blog/posts/Article'
// import OnThisPost from '../../components/blog/posts/OnThisPost'
// import RelatedPosts from '../../components/blog/posts/RelatedPosts'
import ActionButtons from '../../components/blog/posts/ActionButtons'
import Breadcrumbs from '../../components/Breadcrumb'
import { getUsername } from '../../lib/config'
import { useContext, useEffect } from 'react'
import { PortfolioContext } from '../../lib/context'
import { getPortfolio, getPostBySlug } from '../../lib/formio'

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
            {/* TODO: <OnThisPost highlights={post?.data.highlights}/> */}
            {/* TODO: <RelatedPosts related={post?.data.categories}/> */}
            <ActionButtons content={post} link={portfolio?.data?.about?.buyMeACoffee}/>
          </Stack>
        </Box>
      </Stack>
    </>

  )
}
export async function getServerSideProps({req, params}) {
  const username = getUsername(req)
  const {slug } = params
  const post = await getPostBySlug(slug)
  const data = await getPortfolio(username);
  const portfolio = data[0]
  if (!post) {
    return {
      notFound: true,
    };
  }
  try {
    return {
      props: { portfolio, post }
    };
  }  catch (err){
      return {
        notFound: true,
        props: {username}
      }
    }
}

export default PostDetails
