import Link from 'next/link'
import Image from 'next/image'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'

const LogoBox = styled.span`
font-weight: bold;
font-size: 18px;
display: inline-flex;
align-items: center;
height: 30px;
line-height: 20px;
padding: 10px;

&:hover img {
  transform: rotat(180deg);
  transition-timing-function: ease-in;
  transition: 0.2s;
}
`
const Logo = () => {
  let logoImage = `/images/a${useColorModeValue('dark', '')}.svg`
  return(
    <Link href="/">
      <a>
        <LogoBox>
          <Image src={logoImage} width={20} height={20} alt="logo"/>
          <Text
            color={useColorModeValue('gray.800', 'whiteAlpha.900')}
            fontFamily='Poppins'
            fontWeight='bold'
            ml={3}>
            Edwin Anciani
          </Text>
        </LogoBox>
      </a>
    </Link>
  )
}

export default Logo
