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
  nativeMessage
}
from './RectavaloWeb'


const App = () => {
  const { isLoading } = useSelector((state) => state.mobilePlatforms)
  const { loadAppError, loadAppSuccess } = useActions()
  // Initial Loading
  // As a parameter hook can accept loading time , by default is 3s
  // onLoadSuccess and onLoadError callbacks
  useAppLoad(500, loadAppSuccess, loadAppError)

  useEffect(() => {
    addMessageEventListener(nativeMessage)

    return () => {
      removeMessageEventListener(nativeMessage)
    }
  }, [nativeMessage])

  return <>{isLoading ? <SplashScreen /> : <Commander />}</>
}
export default App
