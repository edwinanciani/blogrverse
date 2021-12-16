import { useColorModeValue } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image"
import { Box, Heading, HStack, Link, Text, VStack } from "@chakra-ui/layout"
import { Tag } from "@chakra-ui/tag"

const FeedItem = ({post}) => {
  console.log(post);
  return (<Box maxW="100%" minW="100%" maxH="200px" w={'100%'} py={8}>
   <VStack minH="100%" h="100%" w='100%' mb={4} alignItems={'start'} spacing={3}
      marginTop={{ base: '3', sm: '0' }}>
      <HStack align="center" minW="100%" w="100%">
        <VStack align="start" spacing={4} justify="space-around" minW="70%" maxW="70%">
        <BlogTags tags={post.categories} />
        <Heading px="2" as="h4" size="md" marginTop="1">
          <Link href={`/universe/@${post.author}/${post.slug}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
            {post.title}
          </Link>
        </Heading>
        <Text
          flexWrap="wrap"
          as="p"
          marginTop="2"
          px="2"
          color={useColorModeValue('gray.500', 'gray.300')}
          fontSize="sm">
          {post.description}
        </Text>
        <HStack marginTop='2' spacing='2' display='flex' alignItems='center'>
            <Image
              h="100%"
              borderRadius='full'
              boxSize='30px'
              src={post.banner.urls.regular}
              alt='avatar' /><Link href={`http://${post.author}localhost:3000}`} isExternal>
              <Text fontWeight='bold' fontSize={'sm'}>{post.author}</Text></Link>
              <Text>-</Text>
              <Text>4 Dec</Text>
        </HStack>
        </VStack>
        <Box minW="20%" maxW="20%" maxH="150px" overflow="hidden" justifyContent="center" borderRadius="lg">
          <Image src={post.banner.urls.regular} alt={post.banner.alt_description}  h="100%"  />
        </Box>
      </HStack>
    </VStack>
  </Box>)
}

const BlogTags = (props) =>{
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="primary" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
}

export default FeedItem