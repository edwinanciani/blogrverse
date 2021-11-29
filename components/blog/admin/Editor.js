import {
  useRef,
  useState,
} from 'react'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from 'megadraft'
import 'megadraft/dist/css/megadraft.css'
import {Box, useColorModeValue} from '@chakra-ui/react'
import PluginImage from './Plugins/PluginImage'

const Editor = ({content}) => {

  const editorRef = useRef(null)
  const [editorState, setEditorState] = useState(editorStateFromRaw(null))

  return (
    <Box className={useColorModeValue('editorText', 'editorText_dark')}>
        <MegadraftEditor
        editorState={editorState}
        onChange={(event) => {
          content(editorStateToJSON(event)) 
          setEditorState(event)}}
          plugins={[PluginImage]}
        placeholder='Add some text'/>
    </Box>
  )
}

export default Editor
