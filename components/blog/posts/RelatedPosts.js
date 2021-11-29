// Related Posts needs Slug + Title maybe categories
import { Box, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import { FaBookmark } from 'react-icons/fa'

const RelatedPosts = ({related}) => {
  if (!Array.isArray(related) || related.length === 0) {
    return <Box w='100%' px={3} py={5} ><Heading as={'h3'} size={'md'} py={3} >No Related Posts</Heading></Box>
  }
  return (
    <Box w='100%' px={3} py={5} >
      <Heading as={'h3'} size={'md'} py={3} >Related Posts</Heading>
      <List spacing={3}>
          {related.map(hl => {
          return <Box as="a" key={hl.title} fontSize={'sm'} rel="noreferrer" href={hl.url} target="_blank">
            <ListItem py={1}>
              <ListIcon as={FaBookmark} color="primary.500" />
              {hl.name}
            </ListItem></Box>
        })}
      </List>
    </Box>
  )

}

export default RelatedPosts
