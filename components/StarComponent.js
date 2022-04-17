import { Button, useColorModeValue } from "@chakra-ui/react"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { auth, firestore, increment } from "../lib/firebase"
import { useDocument } from 'react-firebase-hooks/firestore';
const StarComponent = ({postData}) => {
  const bg = useColorModeValue("primary.100", "primary.300")
  // TODO: Likes Features
  const color = useColorModeValue("white", "white")
  // const likeRef = postData.collection('likes').doc(auth.currentUser?.uid)
  // const [likeDoc] = useDocument(likeRef)

  const addLike = async () => {
    if(!auth.currentUser?.uid) {
      console.log('Login PopUP');
      return;
    }
    const batch = firestore.batch()
    batch.update(postData, {LikeCount: increment(1)})
    batch.set(likeRef, {uid:auth.currentUser.uid})
    await batch.commit()
  }

  const removeLike = async () => {
    if(!auth.currentUser?.uid) {
      console.log('Login PopUP');
      return;
    }
    const batch = firestore.batch()

    batch.update(postData, {LikeCount: increment(-1)})
    batch.delete(likeRef)

    await batch.commit()
  }

 return(
   <>
      <Button bg={bg} _hover={{background: 'primary.300'}} onClick={removeLike} color={color} leftIcon={<BsHeartFill />} _focus={{background: 'primary.300', boxShadow: "0 0 1px 2px #C3376a, 0 1px 1px #C3376a"}}>
        Liked!
      </Button> 
      <Button bg={bg} _hover={{background: 'primary.300'}} color={color} onClick={addLike} leftIcon={<BsHeart />} _focus={{background: 'primary.300', boxShadow: "0 0 1px 2px #C3376a, 0 1px 1px #C3376a"}}>
        Like!
      </Button> 
   </>
 )
}

export default StarComponent