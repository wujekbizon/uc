import './SettingsModal.scss'
import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { ImMobile } from 'react-icons/im'
import { useActions } from '../hooks/useActions'
import { useSelector } from 'react-redux'

const SettingsModal = () => {
  const { closeSettingsModal } = useActions()
  const { isMobilePlatform } = useSelector((state) => state.platforms)

  const onHandleClick = () => {
    closeSettingsModal()
  }

  return (
    <aside className={isMobilePlatform ? 'mobile settings-modal' : 'settings-modal'}>
      <nav className="settings-nav">
        <h4>Settings</h4>
        <MdOutlineClose onClick={onHandleClick} className="icon" />
      </nav>
      <div className="settings-content">
        <div className="settings-item">
          <ImMobile className="icon" />
        </div>
      </div>
    </aside>
  )
}
export default SettingsModal
