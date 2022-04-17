import { Button,  Stack, useColorModeValue } from '@chakra-ui/react'
import { BiShare } from 'react-icons/bi'
import StarComponent from '../../StarComponent'
import Coffee from '../../Coffee'

const ActionButtons = ({content, link}) => {
  const bg = useColorModeValue("primary.100", "primary.300")
  const color = useColorModeValue("white", "white")
  if(!content) {
    return <>Post data not provided</>
  }

  return (
    <Stack direction="column" spacing={4}>
      {content ?  <StarComponent  postData={content}/> : null}
      <Button bg={bg} _hover={{background: 'primary.300'}} color={color} leftIcon={<BiShare />} _focus={{background: 'primary.300', boxShadow: "0 0 1px 2px #C3376a, 0 1px 1px #C3376a"}}>
        Share
      </Button>
      { link ? <Coffee bg={bg} link={link} color={color} /> : null}

    </Stack>
  )
}

export default ActionButtons
