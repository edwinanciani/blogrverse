import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import Layout from '../components/layouts/main'
import theme from '../lib/theme'
import Fonts from '../components/fonts'
import '../styles/global.css'
import { PortfolioContext, UserContext } from '../lib/context'
import { useUserData } from '../lib/hook'
import { useState, useContext, useEffect } from 'react'
const Website = ({Component, pageProps, router}) => {
  const userData = useUserData()
  const [portfolio, setPortfolio] = useState(null)
  const [actions, setActions] = useState({
    set: context => setPortfolio(context)
  })
  const [themes, setThemes] = useState(theme)
 useEffect(() => {
   if(!portfolio) {
    return
   }
   if(!portfolio.primaryColors) {
     return;
   }
   const primary = {}
   portfolio.primaryColors.forEach((color) => {
     primary[color.variant] = color.hex
   })
   theme.colors = {...theme.colors, primary}
   console.log(theme);
   console.log(primary);
   const newTheme = extendTheme({
     colors: {
       primary
     }
   })
   setThemes(newTheme) 
 }, [portfolio])
 console.log(theme);
  // ADD profile context
  return (
    <UserContext.Provider value={userData}>
      <ChakraProvider theme={themes}>
        <PortfolioContext.Provider value={{portfolio, actions}}>
          <Fonts />
          <Layout router={router}>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </PortfolioContext.Provider>
      </ChakraProvider>
    </UserContext.Provider>
  )
}
export default Website
