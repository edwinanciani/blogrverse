import { insertDataBlock } from 'megadraft'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box
} from '@chakra-ui/react'
import {useRef} from 'react'
import {BsCardImage} from 'react-icons/bs'
import ImagePlugin from "./ImagePlugin"
export const ButtonImagePlugin = ({onChange, className, editorState}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)
  const setImage = (image) => {
    onClose()
    const data = {"type": "image", "image": image}
    onChange(insertDataBlock(editorState, data))
  }
  return (
    <div>
       <button className={className} onClick={onOpen}>
        <BsCardImage style={{
          position: 'absolute',
          top: '7px',
          height: '20px'
        }} fontSize="sm" size="sm"/>
      </button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box 
          onFocus={(e) => e.stopPropagation()}
          onBlur={(e) => e.stopPropagation()}> 
            <ImagePlugin onImageSet={setImage} />
          </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
