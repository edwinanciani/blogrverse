import {Box, HStack, Tag, TagLabel, Heading} from '@chakra-ui/react'
import {GiSoccerBall} from 'react-icons/gi'
import {FiCode, FiBook} from 'react-icons/fi'
const Badges = () => {
  return (
    <Box mt="5">
      <Heading as='h4' size="md">Life Badges</Heading>
      <HStack mt={5} spacing={4}>
        {[
          {icon: '💘', text:'Husband'},
          {icon: '👧 👧', text:'Dad'},
          {icon: <FiCode />, text: 'Developer'},
          {icon: <GiSoccerBall />, text: 'Soccer Player'},
          {icon: <FiBook />, text: 'Book Reader'},
        ].map(({icon, text }) => (
          <Tag
            size="lg"
            key={text+12}
            borderRadius="full"
            style={{display: 'flex', flexWrap: 'wrap'}}
            variant='outline'
          >
            <TagLabel
            display='flex'
            style={{alignItems: 'center'}}
            >{icon}&nbsp; {text}</TagLabel>
          </Tag>
        ))}
      </HStack>
    </Box>
  )
}

export default Badges
