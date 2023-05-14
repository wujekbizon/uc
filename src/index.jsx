import process from 'socket:process'
import os from 'socket:os'

import { createRoot } from 'react-dom/client'
import React from 'react'
import enableSocketReload from './utils/reload.js'

enableSocketReload({
  startDir: process.cwd(),
  liveReload: true,
  scanInterval: 200,
  debounce: 1001,
  debounceCallback: () => {
    console.log(`updates inbound...`)
  },
  updateCallback: () => {
    window.location.reload()
  }
})

if (process.env.DEBUG) {
  console.log('started in debug mode')
}

function AppContainer () {
  // return <h1>Hello, {os.platform()}!</h1>
  return <h1>Goodbye, terminal.</h1>
}

const root = createRoot(document.getElementById('root'))
root.render(<AppContainer />)
