import './MobileCommandBar.scss'
import React from 'react'
import { useActions } from '../../hooks/useActions'
import { useSelector } from 'react-redux'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FcSettings } from 'react-icons/fc'

// Components
import { SettingsModal } from '../index'

const MobileCommandBar = () => {
  const { isSettingsModalOpen } = useSelector((state) => state.modals)
  const { openSettingsModal } = useActions()

  const onHandleClick = () => {
    openSettingsModal()
  }

  return (
    <header className="mobile_command-bar">
      <nav className="mobile-menu">
        <div className="mobile-logo">
          <h3>Ultimate Commander</h3>
        </div>
        <div className="mobile-icons">
          <GiHamburgerMenu className="icon" />
          <FcSettings className="icon" onClick={onHandleClick} />
        </div>
      </nav>
      {isSettingsModalOpen && <SettingsModal />}
    </header>
  )
}
export default MobileCommandBar
