import {Box, Text, Heading} from '@chakra-ui/react'
import { motion } from "framer-motion"

const Bio = ({bio}) => {
  return (
    <Box p={2}>
    <motion.div
    initial={{opacity: 0, y: 10}}
    animate={{opacity: 1, y: 0}}
    transition={{ ease: "easeIn", duration: 0.8 }}>
      <Text>
        <Heading as='h4' size='md' mb={3}> About </Heading>
        <Text>{bio}</Text>
      </Text>
      </motion.div>
    </Box>
  )
}

export default Bio
