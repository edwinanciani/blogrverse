import Logo from './logo'
import NextLink from 'next/link'
import {
  Container, Box, Link, Stack, Heading, Flex, Menu, MenuItem, MenuList, MenuButton, IconButton, useColorModeValue, Button
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import { auth } from '../lib/firebase'
import { PortfolioContext } from '../lib/context'
import { AiFillHeart } from 'react-icons/ai'
import { BiDollar  } from 'react-icons/bi'

const LinkItem = ({href, path, children}) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.900', 'whiteAlpha.900')
  return(
    <NextLink href={href}>
      <Link
      p={2}
      borderBottomColor={'primary.100'}
      borderBottomWidth={active ? '3px' : undefined}
      color={inactiveColor}>
      {children}
      </Link>
    </NextLink>
  )
}

const Navbar = props => {
  const {path} = props
  const {user, username} = useContext(UserContext)
  const {portfolio} = useContext(PortfolioContext)
  return (
    <Box
      position='fixed'
      as='nav'
      w='100%'
      bg={useColorModeValue('#ffffff', '#20202380')}
      style={{backDropfilter: 'blur(10px)'}}
      zIndex={1}
      {...props}>
        <Container
        display='flex'
        maxW='container.1xl'
        wrap='wrap'
        px={9}
        pt={2}
        align='center'
        justify='space-between'>
          <Flex align="center" mr={5}>
            <Heading as='h1' size='lg' letterSpacing={'tighter'}>
              <Logo username={portfolio ? portfolio.username : null} logo={portfolio ? portfolio.logo : null} />
            </Heading>
          </Flex>
          <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'}  align='start'>
            <Stack
            direction={{base:'column', md: 'row'}}
            display={{base: 'none', md: 'flex'}}
            width={{base: 'full', md: 'auto'}}
            alignItems='center'
            justify={'end'}
            flexGrow={1}
            px={5}
            mt={{base:4, nmd: 0}}>
              {
                portfolio && <>
                  <LinkItem href='/about' path={path}>
                  About
                </LinkItem>
                <LinkItem href='/posts' path={path}>
                  Posts
                </LinkItem>
                <IconButton icon={<AiFillHeart />} />
                <IconButton icon={<BiDollar />} />
                {user &&
               <> 
                <LinkItem href='/universe' path={path}>
                  Explore
                </LinkItem>
                <LinkItem href='/universe' path={path}>
                  <Button color={'primary'} onClick={() => auth.signOut()}>Log Out</Button>
                </LinkItem>
                </>
                 }
              </>
              }
            {!user && !portfolio && 
              <>
              <LinkItem href='/universe' path={path}>
                Explore
              </LinkItem>
              <LinkItem href='/auth' path={path}>
                Get In
              </LinkItem>
              </>}
            { user && (
              <>
              <LinkItem href='/universe' path={path}>
                Explore
              </LinkItem>
                <LinkItem href='/admin' path={path}>
                  Admin
                </LinkItem>
                <LinkItem href={`/admin/portfolio/${username}`} path={path}>
                  Portfolio
                </LinkItem>
                <Button color={'primary'} onClick={() => auth.signOut()}>Log Out</Button>
              </>
            ) }

          </Stack>
            <ThemeToggleButton />
            <Box ml={2} display={{base: 'inline-block', md: 'none'}}>
              <Menu>
                <MenuButton as={IconButton} icon={<HamburgerIcon />} variant='outline' aria-label='Options'/>
                <MenuList>
                  { user && (
                    <>
                      <NextLink href={`/admin/portfolio/${username}`} passHref>
                        <MenuItem as={Link}>Portfolio</MenuItem>
                      </NextLink>
                      <NextLink href='/admin' passHref>
                        <MenuItem as={Link}>Admin</MenuItem>
                      </NextLink>
                    </>
                  ) }
                  <NextLink href='/about' passHref>
                    <MenuItem as={Link}>About</MenuItem>
                  </NextLink>
                  <NextLink href='/posts' passHref>
                    <MenuItem as={Link}>Posts</MenuItem>
                  </NextLink>
                </MenuList>
              </Menu>
            </Box>
          </Box>
        </Container>
    </Box>
  )
}

export default Navbar
