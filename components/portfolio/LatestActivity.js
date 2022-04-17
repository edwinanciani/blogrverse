import { Text, Link, useBreakpointValue, useColorModeValue, List, ListItem, Heading } from "@chakra-ui/react"
import moment from "moment"

const LatestActivity = ({posts}) => {
  return (
    <>
   <Heading as={'h5'} my={'4'} fontSize={'lg'}  >Latest Activity</Heading>  
   <List spacing={3} w={'100%'}>
      {posts.map(post => {
        return <ListItem 
          key={post._id} spacing={2} direction={'column'} 
          py={{ base: '0', sm: '3' }}
          px={{ base: '2', sm: '5' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}>
            <Link href={`/posts/${post.data.slug}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Text fontSize={'md'} fontWeight='medium'>
                {post.data.title}
              </Text>
              <Text fontSize="xs" color={'gray.400'}>
                {moment(post.created).format('dddd DD MMM yyyy')}
              </Text>
              <Text fontSize={'sm'} fontWeight='medium'>
                {post.data.description}
              </Text>
            </Link>
        </ListItem>
      })}
    </List> 
    </>
  )
}
export default LatestActivity