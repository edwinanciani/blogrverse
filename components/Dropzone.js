import { Avatar, IconButton } from '@chakra-ui/react';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { BsFillCameraFill } from 'react-icons/bs';
import { storage} from '../lib/firebase';

const FileUpload = ({updateFile, name, file}) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const avatarRef = storage.ref(`/images/${acceptedFiles[0].name}`).put(acceptedFiles[0])
    avatarRef.on('state_changed', (snapShot)=> {
      console.log(snapShot);
    }, null, () => storage.ref('images').child(acceptedFiles[0].name).getDownloadURL().then(fireBaseUrl => {
      console.log(fireBaseUrl)
      updateFile(fireBaseUrl)
    }))

  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      {
        file ? null : <>
        <input {...getInputProps()} />
        <Avatar style={{cursor: 'pointer'}}  bg={'primary.100'} size="2xl" name={name || 'Avatar'}><IconButton position={'absolute'} bottom={0} right={0} borderRadius={'50%'} icon={ <BsFillCameraFill /> }/></Avatar>
      </>
      }
    </div>
  )
}
export default FileUpload