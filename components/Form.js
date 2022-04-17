import { Box,Text } from '@chakra-ui/react'
import 'formiojs/dist/formio.full.css'
import {Form} from '@formio/react'

const FormComponent = ({form, data, onSubmit, onChange}) => {
  return (<Box>
    {
      typeof window !== "undefined" ? <Form src={form} onChange={onChange} submission={data} onSubmit={onSubmit}  /> : <Text>Form not Loaded</Text>
    }
  </Box>
  )
}

export default FormComponent
