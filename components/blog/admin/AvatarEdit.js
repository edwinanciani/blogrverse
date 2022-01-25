import {Avatar, IconButton, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import { firestore } from '../../../lib/firebase';
import FileUpload from '../../Dropzone';

const AvatarEdit = ({data}) => {
  const [avatar, setAvatar]= useState(null)
  console.log(data);
  useEffect(() => {
    if(data?.logo && !avatar) {
      setAvatar(data.logo);
    }
  })
  if(!data) { return <>Not username</>}
  const updateURL = (url) => {
    const portfolio = firestore.collection('portfolios').doc(username)
    data.logo = url
    portfolio.update(data).then(() => {
      setAvatar(url)
    })
  }

  const {username} = data
  return (
    <VStack py="4">
      {
        avatar ? 
        <Avatar style={{cursor: 'pointer'}} src={avatar}  bg={'primary.100'} size="2xl" name={username || 'Avatar'}><IconButton position={'absolute'} onClick={() => setAvatar(null)} bottom={0} right={0} borderRadius={'50%'} icon={ <BsCameraFill /> }/></Avatar>
        :
        <FileUpload file={avatar} name={username} updateFile={(url) => updateURL(url)}/>
      }
    </VStack>
  )
}

export default AvatarEdit