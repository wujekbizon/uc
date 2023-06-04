import './App.scss'
import React from 'react'
import { useSelector } from 'react-redux'

// custom hooks
import { useAppLoad } from './hooks/useAppLoad'

// Components
import { SplashScreen, Commander } from './components'

const App = () => {
  const { isLoading } = useSelector((state) => state.mobilePlatforms)
  // Initial Loading
  useAppLoad()

  return <>{isLoading ? <SplashScreen /> : <Commander />}</>
}
export default App
