import './Commander.scss'
import React from 'react'

// Components
import { FilesViewer, CommandBar, Taskbar, ViewerDivider } from './index'

const Commander = () => {
  return (
    <main className="commander">
      <CommandBar />
      <FilesViewer />
      <ViewerDivider />
      <Taskbar />
    </main>
  )
}
export default Commander
