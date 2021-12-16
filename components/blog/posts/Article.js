import { Box} from '@chakra-ui/react'
import ArticleHeader from './ArticleHeader'
import Editor from '../admin/Editor'

const Article = ({post}) => {
  if (!post) {
    return 'Not Found'
  }
  return (
    <Box as={`article`} >
      <ArticleHeader content={post} />
      <Editor setContent={post.content} edit={true}  />
      {/* Some integrations like donations */}
      {/* <ArticleFooter/> */}
    </Box>
  )
}
export default Article
