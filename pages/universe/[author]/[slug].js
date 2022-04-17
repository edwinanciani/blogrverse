import { Box, Stack, Divider } from '@chakra-ui/react'
import Article from '../../../components/blog/posts/Article'
// import OnThisPost from '../../components/blog/posts/OnThisPost'
// import RelatedPosts from '../../components/blog/posts/RelatedPosts'
import ActionButtons from '../../../components/blog/posts/ActionButtons'
import Breadcrumbs from '../../../components/Breadcrumb'
import { config, deliveryGuy, getPostBySlug } from '../../../lib/formio'

const UniversePost = ({ post}) => {
  return (
    <>
      <Breadcrumbs paths={{current: {name: post?.data?.title}, past: {name: 'Universe', path: '/universe'}}} />
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
export async function getStaticProps({params}) {
  const {slug } = params
  const post = await getPostBySlug(slug)
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post }
  }
}
export async function getStaticPaths() {
    const posts = await deliveryGuy('GET', config.posts.resource, null, '?limit=9999', true);
    const paths = posts.map((post) => {
      const { slug, username } = post.data
      return {
        params: { author: username, slug },
      };
    })
  return {
    paths,
    fallback: 'blocking'
  }
}
export default UniversePost
