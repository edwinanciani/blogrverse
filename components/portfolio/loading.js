import { Heading, Center, Container, Spacer, VStack, Text, Skeleton } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Container
    display='flex'
    p={2}
    style={{flexWrap: 'wrap'}}
    maxW='container.xl'
    wrap='wrap'
    align='stretch'
    justify='space-between'>
      <Center p={5} align='start'>
        <Skeleton height='100%'>
        <VStack align="start">
          <Heading variant="page-title">
            <Text>Hi!,</Text>
            <Text>I&apos;m Edwin <span className="primary-text">Anciani</span></Text>
          </Heading>
          <Text>Husband, father and sometimes my daughters superhero </Text>
        </VStack>
        </Skeleton>
      </Center>
      <Spacer />
      <Center p={5} align='start'>
        <Skeleton>
        <VStack align="start">
          <Heading variant="page-title">
            <Text>Hi!,</Text>
            <Text>I&apos;m Edwin <span className="primary-text">Anciani</span></Text>
          </Heading>
          <Text>Husband, father and sometimes my daughters superhero </Text>
        </VStack>
        </Skeleton>
      </Center>
      <Spacer />
      <Center p={5} align='start'>
        <Skeleton >
        <VStack align="start">
          <Heading variant="page-title">
            <Text>Hi!,</Text>
            <Text>I&apos;m Edwin <span className="primary-text">Anciani</span></Text>
          </Heading>
          <Text>Husband, father and sometimes my daughters superhero </Text>
        </VStack>
        </Skeleton>
      </Center>
      <Spacer />
      <Center p={5} align='start'>
        <Skeleton height='100%'>
        <VStack align="start">
          <Heading variant="page-title">
            <Text>Hi!,</Text>
            <Text>I&apos;m Edwin <span className="primary-text">Anciani</span></Text>
          </Heading>
          <Text>Husband, father and sometimes my daughters superhero </Text>
        </VStack>
        </Skeleton>
      </Center>
    </Container>
  )
}

export default Loading
