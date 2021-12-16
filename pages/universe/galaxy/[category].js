import React from 'react'
import Feed from '../../../components/blogrverse/Feed';
import { firestore, postToJSON } from '../../../lib/firebase';
import { Container, Heading } from '@chakra-ui/layout';
const LIMIT = 10


const Category = ({posts, category}) => {

  return (
    <Container pt={6} maxW="container.lg">
      <Heading >{category}</Heading>
     <Feed data={posts} category={category}/>
    </Container>
  )
}

export async function getStaticProps({params}) {
  const {category} = params
  const ref = firestore.collection('posts')
  .where('categories', 'array-contains', category)
  .where('public', '==', true)
  .orderBy('created', 'desc')
  .limit(LIMIT)
  const posts = (await ref.get()).docs.map(postToJSON)
  return {
    revalidate: 5000,
    props: {posts, category}
  }
}
export async function getStaticPaths() {
  const ref = await firestore.collectionGroup('categories').get()
  const paths = ref.docs.map((doc) => {
    const {name} = doc.data()
    return {
      params: {category: name }
    }
  })
  return {
    paths,
    fallback: 'blocking',
  }
}
export default Category