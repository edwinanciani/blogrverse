import { Badge, Box } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon } from '@chakra-ui/icons'

const PostCard = ({ post }) => {
  const {slug, title, banner, description, categories} = post
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Link href={`/posts/${slug}`}>
        <a >
          <Image src={`${banner.urls.regular}`} width={400} height={300} alt={`${banner.alt_description}`} />
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
            {categories.length > 0 ? categories.map(cat => cat) : null }
          </Box>
        </Box>
        <Link href={`/posts/${slug}`} passHref>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {title}
          </Box>
        </Link>
        <Box>
          <Box as="span" color="gray.600" fontSize="sm">
           {description}
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
