import {Box, Stack, Tag, TagLabel, Heading} from '@chakra-ui/react'
import {GiSoccerBall} from 'react-icons/gi'
import {FiCode, FiBook} from 'react-icons/fi'
import { motion } from "framer-motion"

const Badges = () => {
  return (
    // TODO: Dynamic Badges
    <Box mt="5">
    <motion.div
    initial={{opacity: 0, y: 10}}
    animate={{opacity: 1, y: 0}}
    transition={{ ease: "easeIn", duration: 1 }}>
      <Heading as='h4' size="md">Life Badges</Heading>
      <Stack mt={5} spacing={0} isInline wrap='wrap' align='stretch'>
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
          >
            <TagLabel
            display='flex'
            style={{alignItems: 'center'}}
            >{icon}&nbsp; {text}</TagLabel>
          </Tag>
        ))}
      </Stack>
      </motion.div>
    </Box>
  )
}

export default Badges
