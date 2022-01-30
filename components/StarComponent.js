import { Button, useColorModeValue } from "@chakra-ui/react"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { auth, firestore } from "../lib/firebase"
import { useDocument } from 'react-firebase-hooks/firestore';
import { increment } from "firebase/firestore"
const StarComponent = ({postData}) => {
  const bg = useColorModeValue("primary.100", "primary.300")
  const color = useColorModeValue("white", "white")
  const uid = auth.currentUser.uid;
  const postRef = firestore.collection('posts').doc(postData.slug)
  const likeRef = postRef.collection('likes').doc(uid)
  const [likeDoc] = useDocument(likeRef)

  const addLike = async () => {
    const batch = firestore.batch()
    batch.update(postRef, {likeCount: increment(1)})
    batch.set(likeRef, {uid})
    await batch.commit()
  }

  const removeLike = async () => {
    const batch = firestore.batch()

    batch.update(postRef, {LikeCount: increment(-1)})
    batch.delete(likeRef)

    await batch.commit()
  }

 return(
   <>
    {
     likeDoc ?
      <Button bg={bg} _hover={{background: 'primary.300'}} onClick={removeLike} color={color} leftIcon={<BsHeartFill />} _focus={{background: 'primary.300', boxShadow: "0 0 1px 2px #C3376a, 0 1px 1px #C3376a"}}>
        Liked!
      </Button> :
      <Button bg={bg} _hover={{background: 'primary.300'}} color={color} onClick={addLike} leftIcon={<BsHeart />} _focus={{background: 'primary.300', boxShadow: "0 0 1px 2px #C3376a, 0 1px 1px #C3376a"}}>
        Like!
      </Button> 
    }
   </>
 )
}

export default StarComponent