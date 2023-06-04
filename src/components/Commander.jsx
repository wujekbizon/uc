import './Commander.scss'
import React from 'react'
import os from 'socket:os'
import { useSelector } from 'react-redux'

// Components
import { PanelView, CommandBar, Taskbar } from './index'
import { MobilePanelView } from './mobile/index'

const Commander = () => {
  const { isMobile } = useSelector((state) => state.mobilePlatforms)

  return (
    <main className="commander">
      <CommandBar />
      {!isMobile && os.platform() === 'win32' && <PanelView />}
      {isMobile && <MobilePanelView />}
      <Taskbar />
    </main>
  )
}
export default Commander
