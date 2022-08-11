import PropTypes from 'prop-types'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import GlobalContainer from 'components/common/containers/globalContainer'
import globalResetStyles from 'styles/globalResetStyles'
import theme from 'theme'
import createEmotionCache from 'createEmotionCache'
import axios from 'axios'
import { SWRConfig } from 'swr'
import { BACKEND_URL } from 'constants/constants'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <GlobalContainer>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {globalResetStyles}
          <SWRConfig
            value={{
              fetcher: ({ baseURL = BACKEND_URL, url, config }) => {
                const axiosConfig = {
                  baseURL,
                  ...config,
                }

                return axios.get(url, axiosConfig).then(res => res.data)
              },
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </ThemeProvider>
      </GlobalContainer>
    </CacheProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
