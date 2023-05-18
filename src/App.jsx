import './App.scss'
import React, { useEffect } from 'react'
import { arch } from 'socket:os'

// Components
import { Commander } from './components'

const App = () => {
  // Rendering title
  useEffect(() => {
    document.title = `Ultimate Commander (${arch()}) 1.0 - PreBuild`
  }, [])

  return <Commander />
}
export default App
