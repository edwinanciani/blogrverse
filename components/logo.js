import Link from 'next/link'
import Image from 'next/image'
import {Text, useColorModeValue } from '@chakra-ui/react'
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
const Logo = ({portfolio}) => {
  let logoImage = `/images/a${useColorModeValue('dark', '')}.svg`
  if (portfolio?.logo[0]?.url) {
    logoImage = `${portfolio.logo[0].url}`;
  }
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
            {portfolio?.textLogo || portfolio?.pageTitle || 'My Portfolio'}
          </Text>
        </LogoBox>
      </a>
    </Link>
  )
}

export default Logo
