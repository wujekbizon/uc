import './Commander.scss'
import React from 'react'
import sys from '../rectavalo/sys'
import { useSelector } from 'react-redux'

// Components
import { PanelView, CommandBar, Taskbar } from './index'
import { MobilePanelView } from './mobile/index'

const Commander = () => {
  // const { isMobile } = useSelector((state) => state.mobilePlatforms)
  const isMobilePlatform = sys.platform() === 'ios' || sys.platform() === 'android'
  const isDesktopPlatform = sys.platform() === 'darwin' || sys.platform() === 'win32' || sys.platform() === 'linux'

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
