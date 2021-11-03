import {Box, Text, Heading} from '@chakra-ui/react'

const Bio = ({bio}) => {
  return (
    <Box p={2}>
      <Text>
        <Heading as='h4' size='md' mb={3}> About </Heading>
        <Text>Born in Cabimas, Venezuela, a small town.
        Controversial and trouble maker since a young age but always with a big imagination and creativity.
        Playing soccer everywhere and every day till I started programming.
        I started to create my first website TopFoto around 2007 which was a similar idea to what is Instagram right now.
        Then I did work as a freelancer for a long time wishing that someday I could work in the USA for a great company.
        I graduate from IUP. Santiago Mariño, Venezuela in 2013. Since then I've been working in companies from Argentina to the USA.
        Now I live in Texas, US, and I'm part of the Core Team (Big Family) of Form.io ♥</Text>
      </Text>
    </Box>
  )
}

export default Bio
