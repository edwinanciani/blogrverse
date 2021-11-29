// On This Post Link Related ( Docs, Helpers or Videos)
import { Box, Heading, List, ListIcon, ListItem } from '@chakra-ui/react'
import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'

const OnThisPost = ({highlights}) => {
  if (highlights.length === 0) {
    return  <Box w='100%' py={5} px={3}>
      <Heading as="h4" size={'md'} py={3}>No Links in this Post!</Heading>
    </Box>
  }
  return (
    <Box w='100%' py={5} px={3}>
      <Heading as="h4" size={'md'} py={3}>On this Post!</Heading>
      <List spacing={3}>
        {highlights.map(hl => {
          return <Box as="a" key={hl.name} fontSize={'sm'} rel="noreferrer" href={hl.url} target="_blank">
            <ListItem py={1}>
            <ListIcon as={FaCheckCircle} color="green.500" />
            {hl.name}
          </ListItem></Box>
        })}
      </List>
    </Box>
  )
}

export default OnThisPost
