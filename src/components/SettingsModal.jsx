import './SettingsModal.scss'
import React from 'react'
import { MdOutlineClose, MdConstruction } from 'react-icons/md'
import { ImMobile } from 'react-icons/im'
import { useActions } from '../hooks/useActions'
import { useSelector } from 'react-redux'

const SettingsModal = () => {
  const { closeSettingsModal, enableMobileLayout, disableMobileLayout } = useActions()
  const { isMobile } = useSelector((state) => state.mobilePlatforms)

  const onHandleClick = () => {
    closeSettingsModal()
  }

  const onClickEnable = () => {
    enableMobileLayout()
    closeSettingsModal()
  }

  const onClickDisable = () => {
    disableMobileLayout()
    closeSettingsModal()
  }

  return (
    <aside className={isMobile ? 'mobile settings-modal' : 'settings-modal'}>
      <nav className="settings-nav">
        <h4>Settings</h4>
        <MdOutlineClose onClick={onHandleClick} className="icon" />
      </nav>
      <div className="settings-content">
        <div className="settings-item">
          <ImMobile className="icon" />
          {!isMobile && <button onClick={onClickEnable}>Enable Mobile Layout</button>}
          {isMobile && <button onClick={onClickDisable}>Disable Mobile Layout</button>}
        </div>
      </div>
    </aside>
  )
}
export default SettingsModal