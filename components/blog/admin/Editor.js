import {
  useState,
} from 'react'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from 'megadraft'
import 'megadraft/dist/css/megadraft.css'
import {Box, useColorModeValue} from '@chakra-ui/react'
import Plugin from './Plugins/PluginImage'

const Editor = ({content, setContent, edit}) => {
  const [editorState, setEditorState] = useState(editorStateFromRaw(setContent))
  
  return (
    <Box px={2} className={useColorModeValue('editorText', 'editorText_dark')}>
        <MegadraftEditor
        editorState={editorState}
        onChange={(event) => {
          content(editorStateToJSON(event)) 
          setEditorState(event)}}
          plugins={[Plugin]}
          readOnly={edit}
        placeholder='Add some text'/>
    </Box>
  )
}

export default Editor
