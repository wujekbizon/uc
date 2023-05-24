import './Commander.scss'
import React from 'react'

// Components
import { PanelView, CommandBar, Taskbar } from './index'

const Commander = () => {
  return (
    <main className="commander">
      <CommandBar />
      <PanelView />
      <Taskbar />
    </main>
  )
}
export default Commander
