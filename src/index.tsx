import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store/redux/store'
import { AppMobile } from 'AppMobile'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const screenWidth = window.screen.width
console.log(screenWidth)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>{screenWidth >= 400 ? <App /> : <AppMobile />}</Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
