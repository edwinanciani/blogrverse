import { Box} from '@chakra-ui/react'
import RenderComponents from './RenderComponents'
import ArticleHeader from './ArticleHeader'
import ArticleFooter from './ArticleFooter'

const Article = ({post}) => {
  if (!post) {
    return 'Not Found'
  }
  const {data} = post
  return (
    <Box as={`article`} >
      <ArticleHeader content={data} />
      <RenderComponents post={data} />
      <ArticleFooter/>
    </Box>
  )
}
export default Article
