import { Heading, Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import React from 'react'

export const Title = ({onTitle, edit, title}) => {
  return (
    <div>
      <Heading py={10} as="h1">
        <Editable onChange={onTitle} value={title} isDisabled={edit} placeholder="A great story begins with a title.." submitOnBlur={true}>
          <EditableInput></EditableInput>
          <EditablePreview></EditablePreview>
        </Editable>
      </Heading>
    </div>
  )
}
