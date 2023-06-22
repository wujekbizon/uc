import { createRoot } from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './state/store.js'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
