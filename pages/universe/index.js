import { Box, Divider, Heading, HStack } from "@chakra-ui/layout"
import Categories from "../../components/blogrverse/Categories"
import Feed from "../../components/blogrverse/Feed"
import { config, deliveryGuy, getCategories } from "../../lib/formio"
const LIMIT = 10
const FeedUniverse = ({posts, categories}) => {
  return (<>
    <HStack spacing={0} height="lg">
      <Box w="65%" p={3} >
        <Feed data={posts}/>
      </Box>
      <Box display="flex" flexDir="row" w="20%" maxH="lg">
        <Divider orientation="vertical" height="400px" />
        <Box w="100%" px={6}>
          <Heading as="h5" size="sm">Categories</Heading>
          <Categories categories={categories} />
        </Box>
      </Box>
    </HStack>
  </>)
}

export async function getServerSideProps() {
  const posts = await deliveryGuy('GET', config.posts.resource, null, `?limit=${LIMIT}`, true)
  const categories = await getCategories({})
  return {
    props: { posts, categories}
  }
}

export default FeedUniverse