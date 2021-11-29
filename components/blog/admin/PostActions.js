import { Box, Button, FormControl, FormLabel, Heading, Stack, Switch } from '@chakra-ui/react'
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/all'

const PostActions = () => {
  return (
    <Box>
      <Heading as={'h3'} size={'md'}>Actions</Heading>
      <Stack w={'50%'} spacing={4}>
        <Button
          mt={4}
          leftIcon={<AiOutlineEdit />}
          colorScheme="teal"
          isLoading={false}
          type="submit"
        >
          Edit
        </Button>
        <Button
          mt={4}
          leftIcon={<AiOutlineEye />}
          colorScheme="teal"
          isLoading={false}
          type="submit"
        >
          Preview
        </Button>
      </Stack>
      <FormControl py={6} display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          Published
        </FormLabel>
        <Switch id="email-alerts" />
      </FormControl>
    </Box>
  )
}

export default PostActions
