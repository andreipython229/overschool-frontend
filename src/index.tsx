import React from 'react'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import { AppMobile } from 'AppMobile'
import { store } from './store/redux/store'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const persistor = persistStore(store)

const screenWidth = window.screen.width

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
          {screenWidth >= 1025 ? <App /> : <AppMobile />}
        </PersistGate>
      </Provider>
    </BrowserRouter>
    ,
  </React.StrictMode>,
)
