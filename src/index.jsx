import process from 'socket:process'
import { createRoot } from 'react-dom/client'
import React from 'react'
import enableSocketReload from './utils/reload.js'
import { Provider } from 'react-redux'
import { store } from './state/store.js'
import App from './App.jsx'

enableSocketReload({
  startDir: process.cwd(),
  liveReload: false,
  scanInterval: 200,
  debounce: 1001,
  debounceCallback: () => {
    console.log(`updates inbound...`)
  },
  updateCallback: () => {
    window.location.reload()
  },
})

if (process.env.DEBUG) {
  console.log('started in debug mode')
}

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
