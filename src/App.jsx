import './App.scss'
import React from 'react'
import { useSelector } from 'react-redux'

// custom hooks
import { useAppLoad } from './hooks/useAppLoad'
import { useActions } from './hooks/useActions'

// Components
import { SplashScreen, Commander } from './components'

const App = () => {
  const { isLoading } = useSelector((state) => state.mobilePlatforms)
  const { loadAppError, loadAppSuccess } = useActions()
  // Initial Loading
  // As a parameter hook can accept loading time , by default is 3s
  // onLoadSuccess and onLoadError callbacks
  useAppLoad(5000, loadAppSuccess, loadAppError)

  return <>{isLoading ? <SplashScreen /> : <Commander />}</>
}
export default App
