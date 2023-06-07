import './MobileCommandBar.scss'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

// Components

const MobileCommandBar = () => {
  return (
    <header className="mobile_command-bar">
      <nav className="mobile-menu">
        <div className="mobile-logo">
          <h3>Ultimate Commander</h3>
        </div>
        <div className="mobile-icons">
          <GiHamburgerMenu className="icon" />
        </div>
      </nav>
    </header>
  )
}
export default MobileCommandBar
