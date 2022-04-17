import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from '../components/layouts/main'
import theme from '../lib/theme'
import Fonts from '../components/fonts'
import '../styles/global.css'
import {
  PortfolioContext,
  ProvidedAuth,
} from '../lib/context'
import { useState, useEffect } from 'react'
const Website = ({ Component, pageProps, router }) => {
  const [portfolio, setPortfolio] = useState(null)
  const [actions] = useState({
    set: context => {console.log(context); setPortfolio(context)}
  })
  const [themes, setThemes] = useState(theme)
  useEffect(() => {
    if (!portfolio) {
      return
    }
    if (!portfolio.data.primaryColors) {
      return
    }
    const primary = {}
    portfolio.data.primaryColors.forEach(color => {
      primary[color.variant] = color.hex
    })
    theme.colors = { ...theme.colors, primary }
    const newTheme = extendTheme({
      colors: {
        primary
      }
    })
    setThemes(newTheme)
  }, [portfolio])
  // ADD profile context
  return (
    <ProvidedAuth>
      <ChakraProvider theme={themes}>
        <PortfolioContext.Provider value={{ portfolio, actions }}>
          <Fonts />
          <Layout router={router}>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </PortfolioContext.Provider>
      </ChakraProvider>
    </ProvidedAuth>
  )
}
export default Website
