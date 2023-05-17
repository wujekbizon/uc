import './Commander.scss'
import React from 'react'

// Components
import { FilesViewer, CommandBar, Taskbar } from './index'

const Commander = () => {
  return (
    <main className="commander">
      <CommandBar />
      <FilesViewer />
      <Taskbar />
    </main>
  )
}
export default Commander
