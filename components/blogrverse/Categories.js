import React from 'react'
import { Box, HStack, Tag, Link} from '@chakra-ui/react'
export default function Categories({categories}) {
  if (!categories) {
    return <Box px={6}>Not Categories Created</Box>
    
  }
  return (
      <HStack wrap="wrap" w="100%" spacing={2} py={6}>
        {categories.length > 0 ? categories.map((category) => {
          return <Link textDecoration='none' key={category.value} href={`/universe/galaxy/${category.name}`}><Tag  variant='outline' my={1} >{category.name}</Tag></Link>
        }) : null}
      </HStack>
  )
}