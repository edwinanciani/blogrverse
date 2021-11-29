// import { Code, Heading, Text, Box } from '@chakra-ui/react'
// import Image from 'next/image'
// import parser from 'html-react-parser'
import { Box } from '@chakra-ui/layout';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./blog/admin/Editor'), {ssr: false})


const  InlineComponent = ({ components }) => {
  if (!components) {
    components = [{type: 'heading'}]
  }
  console.log(components);
  return (
    <div className='container'>
      {
        components.map((component, i) => {
          switch (component.type) {
            case 'heading':
              return <Box key={i} px={8} py={4}> <Editor /></Box>
            case 'paragraph':
              // Return Component
            case 'code':
              // Return Code Component
            default:
              break
          }
        })
      }
    </div>)
}
export default InlineComponent 