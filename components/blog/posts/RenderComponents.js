import { Code, Heading, Text, Box } from '@chakra-ui/react'
import Image from 'next/image'
import parser from 'html-react-parser'

const RenderComponents = ({ post }) => {
  const {content} = post
  console.log(post)
  if (!Array.isArray(content) || content.length === 0) {
    return <><h3>Components has not been added</h3></>
  }
  return (
    <>
      {content.map((component, i) => {
        switch (component.reactComponent) {
          case 'heading':
            return <Box key={i} py={5}><Heading as={component.type}>{component.content}</Heading></Box>
          case 'paragraph':
            return <Box key={i} py={5}><Text key={i} color="gray.600">{parser(component.paragraph)}</Text></Box>
          case 'code':
            return <Box key={i} py={5}><Code key={i}>{component.content}</Code></Box>
          case 'screenshot':
            return <Box key={i} py={5}>
              <Image key={i}
              src={component.src}  alt={component.alt}
              width={component.width} height={component.height}></Image>
            </Box>
          case 'playground':
            return <h5>Formio Component Coming Soon.</h5>
        }
      })}
    </>)
}
export default RenderComponents
