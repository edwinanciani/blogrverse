import { Badge, Box } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon } from '@chakra-ui/icons'

const PostCard = ({ post }) => {
  const {_id, data} = post
  return (
    <Box key={_id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Link href={`/posts/${data.slug}`}>
        <a >
          <Image src={`https://bit.ly/2Z4KKcF`} width={400} height={300} alt={`Rear view of modern home with pool`} />
        </a>
      </Link>
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="primary">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            Category
          </Box>
        </Box>
        <Link href={`/posts/${data.slug}`}>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {data.title}
          </Box>
        </Link>
        <Box>
          Algo Relevante
          <Box as="span" color="gray.600" fontSize="sm">
            / Para seguir
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <StarIcon color={"primary.100"}/>
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            14
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PostCard
