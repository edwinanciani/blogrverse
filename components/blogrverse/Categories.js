import React from 'react'
import { Box, HStack, Tag, Link} from '@chakra-ui/react'
export default function Categories({categories}) {
  if (!categories) {
    return <Box px={6}>Not Categories Created</Box>
  }
  console.log(categories);
  return (
      <HStack wrap="wrap" w="100%" spacing={2} py={6}>
        {categories.length > 0 ? categories.map((category) => {
          return <Link textDecoration='none' key={category.data?.value} href={`/universe/galaxy/${category?.data.value}`}><Tag  variant='outline' my={1} >{category.data.label}</Tag></Link>
        }) : null}
      </HStack>
  )
}