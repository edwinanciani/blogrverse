import { useColorModeValue } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image"
import { Box, Heading, HStack, Link, Text, VStack } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/tag"
import moment from "moment";

const FeedItem = ({portfolio, post}) => {
  console.log(post);
  return (<Box maxW="100%" minW="100%" maxH="200px" w={'100%'} py={8}>
   <VStack minH="100%" h="100%" w='100%' mb={4} alignItems={'start'} spacing={3}
      marginTop={{ base: '3', sm: '0' }}>
      <HStack align="center" minW="100%" w="100%">
        <VStack align="start" spacing={4} justify="space-around" minW="70%" maxW="70%">
        <BlogTags tags={post.data.categories} />
        <Heading px="2" as="h4" size="md" marginTop="1">
          <Link href={portfolio? `/posts/${post.data.slug}` :`/universe/@${post.data.username}/${post.data.slug}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
            {post.data.title}
          </Link>
        </Heading>
        <Text
          flexWrap="wrap"
          as="p"
          marginTop="2"
          px="2"
          color={useColorModeValue('gray.500', 'gray.300')}
          fontSize="sm">
          {post.data.description}
        </Text>
        <HStack marginTop='2' spacing='2' display='flex' alignItems='center'>
            <Avatar
              size={'xs'}
              src={post?.data?.authorMeta?.avatar}
              name={post?.data?.username} /><Link href={`http://${post?.data?.username}localhost:3000}`} isExternal>
              <Text fontWeight='bold' fontSize={'sm'}>{post.data.username}</Text></Link>
              <Text>-</Text>
              <Text>{moment(post.created).format('dddd D MMM yyyy')}</Text>
        </HStack>
        </VStack>
        <Box minW="20%" maxW="20%" maxH="150px" overflow="hidden" justifyContent="center" borderRadius="lg">
          <Image src={post?.data?.banner?.urls?.regular} alt={post?.data?.banner?.alt_description}  h="100%"  />
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