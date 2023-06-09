import './CommandBar.scss'
import React, { useState, useMemo } from 'react'
import { links, subLinksIcons } from '../data/commandBarLinks'
import { useMenuShortcuts } from '../hooks/useMenuShortcuts'
import { useActions } from '../hooks/useActions'

// components
import { CommandBarSubMenu } from './index'

const CommandBar = () => {
  const [active, setActive] = useState(null)
  const { openSubMenu } = useActions()

  const memoizeHandleKeyPress = useMemo(
    () => (key, modifiers, callback) => {
      const listener = (event) => {
        const hasModifiers = modifiers.every((modifier) => event[`${modifier.toLowerCase()}Key`])
        if (hasModifiers && event.key === key) {
          callback(event)
        }
      }
      window.addEventListener('keydown', listener)
      return () => {
        window.removeEventListener('keydown', listener)
      }
    },
    []
  )

  useMenuShortcuts(memoizeHandleKeyPress)

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
    // Extracts the text content of the link that triggered the event,
    // and removes any whitespace around it using the `trim()` method.
    const page = event.target.textContent.trim()
    // Use the `getBoundingClientRect()` method to get the coordinates
    // of the link relative to the viewport.
    const tempBtn = event.target.getBoundingClientRect()
    //  Calculates the start and bottom coordinates
    const start = tempBtn.right - tempBtn.width
    const bottom = tempBtn.bottom
    const coordinates = { start, bottom }
    // Call openSubMenu function with page and coordinates
    openSubMenu({ page, coordinates })
  }

  return (
    <section className="commandbar">
      <div className="commandbar_list-container">
        <ul className="commandbar_list">
          {links.map(({ link }, index) => (
            <li id={`menu-link${index}`} key={index} onMouseOver={displaySubmenu}>
              {link}
            </li>
          ))}
        </ul>
        <div>
          <h4>
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
      <CommandBarSubMenu />
    </section>
  )
}
export default CommandBar
