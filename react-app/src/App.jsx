import './App.scss'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

// custom hooks
import { useAppLoad } from './hooks/useAppLoad'
import { useActions } from './hooks/useActions'
import FileSystem from './rectavalo/FileSystem'

// Components
import { SplashScreen, Commander } from './components'

// native layer
import { addMessageEventListener, removeMessageEventListener, nativeMessage, log } from './rectavalo/RectavaloWeb'

import sys from './rectavalo/sys'

const App = () => {
  const { isLoading } = useSelector((state) => state.platforms)
  const { loadAppError, loadAppSuccess, setCurrentWorkingDirectory, setCurrentPlatform } = useActions()
  // Initial Loading
  // As a parameter hook can accept loading time , by default is 3s
  // onLoadSuccess and onLoadError callbacks
  useAppLoad(500, loadAppSuccess, loadAppError)

  useEffect(() => {
    FileSystem.cwd().then((path) => {
      setCurrentWorkingDirectory(path)
    })
    // initialization of the platform
    setCurrentPlatform(sys.platform())
  }, [setCurrentWorkingDirectory, setCurrentPlatform])

  useEffect(() => {
    addMessageEventListener(nativeMessage)
    setTimeout(() => {
      log(`agent: ${navigator.userAgent}, platform: ${sys.platform()} - ${sys.architecture()}`)
    }, 1000)

    return () => {
      removeMessageEventListener(nativeMessage)
    }
  }, [])

  return <>{isLoading ? <SplashScreen /> : <Commander />}</>
}
export default App
