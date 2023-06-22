import './MobileViewerDivider.scss'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { dividerItems } from '../../data/dividerLinks'
import { useActions } from '../../hooks/useActions'

// Components
import { SettingsModal } from '../index'

const MobileViewerDivider = () => {
  const { isSettingsModalOpen } = useSelector((state) => state.modals)
  const { openSettingsModal } = useActions()
  const [active, setActive] = useState(null)

  const onHandleFilesManipulation = (text, id) => {
    switch (text) {
      case 'Copy':
      case 'Edit':
      case 'New':
      case 'Move':
      case 'Delete':
      case 'Empty':
      case 'Pack Files':
        console.log(text)
        setActive(id)
        break
      case 'Settings':
        openSettingsModal()
        setActive(id)
        break
      default:
        console.log('Invalid option')
        break
    }
  }

  return (
    <div className="mobile_divider">
      {dividerItems.map(({ icon, text, id }, index) => (
        <div className={active === index + 1 ? 'icon-container active' : 'icon-container'} key={id}>
          <div className="icon" onClick={() => onHandleFilesManipulation(text, id)}>
            {icon}
          </div>
          <span className="icon-text">{text}</span>
        </div>
      ))}

      {isSettingsModalOpen && <SettingsModal />}
    </div>
  )
}
export default MobileViewerDivider
