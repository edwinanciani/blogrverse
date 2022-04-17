import {
  useState,
} from 'react'
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from 'megadraft'
import 'megadraft/dist/css/megadraft.css'
import {Box, useColorModeValue} from '@chakra-ui/react'
import Plugin from './Plugins/PluginImage'

const Editor = ({content, setContent, edit}) => {
  console.log(setContent);
  const parsed = typeof(setContent) === 'object' ? setContent :  setContent ? JSON.parse(setContent) : null
  const [editorState, setEditorState] = useState(editorStateFromRaw(parsed || null))
  const updateContent = (event) => {
    if(!edit) {
      setEditorState(event)
    }
  }
  if(content) {
    content(editorStateToJSON(editorState));
  }

  return (
    <Box px={2} className={useColorModeValue('editorText', 'editorText_dark')}>
        <MegadraftEditor
        editorState={editorState}
        onChange={updateContent}
          plugins={[Plugin]}
          readOnly={edit}
        placeholder='Add some text'/>
    </Box>
  )
}

export default Editor
