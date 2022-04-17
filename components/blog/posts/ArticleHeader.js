import { Box, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'

const ArticleHeader = ({content}) => {
  return (
    <>
      <Heading as={'h1'} size={'2xl'} py={3}>{content.data.title}</Heading>
      <Text fontSize="md" py={5} color={'gray.500'}>{content.data.description}</Text>
      <Box borderRadius={'lg'} overflow="hidden" w={'100%'} >
        <Image src={content.data.banner?.urls.regular} height={50} width={'100%'} alt={content.data?.banner?.alt_description} layout={'responsive'}/>
      </Box></>
  )
}
// Make default art to fallback the Banner Image
export default ArticleHeader
