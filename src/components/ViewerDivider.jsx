import './ViewerDivider.scss'
import React, { useState } from 'react'
import { dividerItems } from '../data/dividerLinks'

const ViewerDivider = () => {
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
      case 'Settings':
        console.log(text)
        setActive(id)
        break
      default:
        console.log('Invalid option')
        break
    }
  }

  return (
    <div className="divider">
      <div>
        {dividerItems.map(({ icon, text, id }, index) => (
          <div className={active === index + 1 ? 'icon-container active' : 'icon-container'} key={id}>
            <div className="icon" onClick={() => onHandleFilesManipulation(text, id)}>
              {icon}
            </div>
            <span className="icon-text">{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ViewerDivider
