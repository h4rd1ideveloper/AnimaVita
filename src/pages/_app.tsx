import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

import { useStore } from '../store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import style from '../styles/style.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, function persistCallback() {
    persistor.persist()
  })
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div className={style.spinner} />}
        persistor={persistor}
      >
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <GlobalStyle />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
