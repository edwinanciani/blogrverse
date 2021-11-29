import dynamic from 'next/dynamic'
import { config } from '../lib/formio'
import { Box, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
// import 'bootstrap/dist/css/bootstrap.css'
import 'formiojs/dist/formio.full.css'

const Form = dynamic(() => import('@formio/react').then(module => module.Form), {ssr: false})

const FormComponent = () => {
  return (<Box>
      <FormControl id="first-name" isRequired>
        <FormLabel>First name</FormLabel>
        <Input placeholder="First name" />
      </FormControl>
    {
      typeof window !== "undefined" ? <Form src={config.posts.form} onSubmit={(event)=> {
        console.log(event)} } /> : <Text>Form not Loaded</Text>
    }
  </Box>
  )
}

export default FormComponent
