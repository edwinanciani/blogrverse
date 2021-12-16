import { Heading, Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import React from 'react'

export const Description = ({onDescription, edit, description}) => {
  return (
    <div>
      <Heading pb={10} as="h3" size="sm" color="gray">
        <Editable onChange={onDescription} value={description} isDisable={edit} placeholder="Small Description" submitOnBlur={true}>
          <EditableInput></EditableInput>
          <EditablePreview></EditablePreview>
        </Editable>
      </Heading>
    </div>
  )
}
