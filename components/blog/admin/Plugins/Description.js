import { Text, Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import React from 'react'

export const Description = ({onDescription}) => {
  return (
    <div>
      <Text pb={4} as="h3" size="sm" color="gray">
        <Editable onChange={onDescription} placeholder="Small Description" submitOnBlur={true}>
          <EditableInput></EditableInput>
          <EditablePreview></EditablePreview>
        </Editable>
      </Text>
    </div>
  )
}
