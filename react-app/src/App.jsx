import './App.scss'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

// custom hooks
import { useAppLoad } from './hooks/useAppLoad'
import { useActions } from './hooks/useActions'

// Components
import { SplashScreen, Commander } from './components'

// native layer
import {
  addMessageEventListener,
  removeMessageEventListener,
  nativeMessage,
  log
}
from './rectavalo/RectavaloWeb'

import sys from './rectavalo/sys'

const App = () => {
  const { isLoading } = useSelector((state) => state.mobilePlatforms)
  const { loadAppError, loadAppSuccess } = useActions()
  // Initial Loading
  // As a parameter hook can accept loading time , by default is 3s
  // onLoadSuccess and onLoadError callbacks
  useAppLoad(500, loadAppSuccess, loadAppError)

  useEffect(() => {
    addMessageEventListener(nativeMessage)
    setTimeout(() => {
      log(`agent: ${navigator.userAgent}, platform: ${sys.platform()} - ${sys.architecture()}`)
    }, 1000)

    return () => {
      removeMessageEventListener(nativeMessage)
    }
  }, [nativeMessage])

  return <>{isLoading ? <SplashScreen /> : <Commander />}</>
}
export default App
