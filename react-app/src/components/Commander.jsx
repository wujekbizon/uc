import './Commander.scss'
import React from 'react'
import { useSelector } from 'react-redux'

// Components
import { PanelView, CommandBar, Taskbar } from './index'
import { MobilePanelView } from './mobile/index'

const Commander = () => {
  const { isMobilePlatform, isDesktopPlatform } = useSelector((state) => state.platforms)

  return (
    <main className={isMobilePlatform ? 'mobile-commander' : 'commander'}>
      {isDesktopPlatform && <CommandBar />}
      {isDesktopPlatform && <PanelView />}
      {isDesktopPlatform && <Taskbar />}
      {isMobilePlatform && <MobilePanelView />}
    </main>
  )
}
export default Commander
