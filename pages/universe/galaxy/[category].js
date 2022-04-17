import React from 'react'
import Feed from '../../../components/blogrverse/Feed';
import { Container, Heading } from '@chakra-ui/layout';
import { config, deliveryGuy, getCategories } from '../../../lib/formio';


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
  const posts = await deliveryGuy('GET', config.posts.resource, null, `?data.categories__in=${category}`, true) 
  return {
    revalidate: 5000,
    props: {posts, category}
  }
}
export async function getStaticPaths() {
  const categories = await getCategories({})
  const paths = categories.map((cat) => {
    const {value} = cat.data
    return {
      params: {category: value }
    }
  })
  return {
    paths,
    fallback: 'blocking',
  }
}
export default Category