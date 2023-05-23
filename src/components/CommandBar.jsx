import './CommandBar.scss'
import React, { useEffect, useState } from 'react'
import { links, subLinksIcons } from '../data/commandBarLinks'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import memoizeHandleKeyPress from '../helpers/keyboardUtilis'
import { useMenuShortcuts } from '../hooks/useMenuShortcuts'

// components
import { CommandBarSubMenu } from './index'

const CommandBar = () => {
  const [active, setActive] = useState(null)
  const isSubMenuOpen = useSelector((state) => state.modals.isSubMenuOpen)
  const { openSubMenu, closeSubMenu } = useActions()
  const handleKeyPress = memoizeHandleKeyPress()

  useMenuShortcuts(handleKeyPress)

  const handleClick = (title, id) => {
    switch (title) {
      case 'Reread Source':
      case 'File Names':
      case 'All Files':
      case 'Thumbnail':
      case 'Go Back':
      case 'Go Forward':
      case 'Invert':
      case 'Search':
      case 'Rename Files':
      case 'Notepad':
      case 'Sync Dir':
      case 'Copy Names':
        console.log(title)
        setActive(id)
        break
      default:
        console.log('Invalid option')
        break
    }
  }

  const displaySubmenu = (event) => {
    // const page = event.target.textContent
    // const tempBtn = event.target.getBoundingClientRect()
    // const center = (tempBtn.left + tempBtn.right) / 2
    // const bottom = tempBtn.bottom - 3
  }

  return (
    <section className="commandbar">
      <div className="commandbar_list-container">
        <ul className="commandbar_list">
          {links.map(({ link }, index) => (
            <li key={index} onMouseOver={displaySubmenu}>
              {link}
            </li>
          ))}
        </ul>
        <div>
          <h4>
            {/* here I want to have a button that will open new window and 
            show all the shortcuts, help ,credits etc or I can show modal 
            we can discuss that*/}
            <span>H</span>elp
          </h4>
        </div>
      </div>
      <div className="commandbar-icons_menu">
        {subLinksIcons.map(({ id, title, icon }, index) => (
          <div key={id} className={active === index + 1 ? 'commandbar-icons active' : 'commandbar-icons'}>
            <div className="icon" onClick={() => handleClick(title, id)}>
              {icon}
            </div>
            <div className="commandbar-info">{title}</div>
          </div>
        ))}
      </div>
      {isSubMenuOpen && <CommandBarSubMenu />}
    </section>
  )
}
export default CommandBar
