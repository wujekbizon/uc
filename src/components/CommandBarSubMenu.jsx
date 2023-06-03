import './CommandBarSubMenu.scss'
import React, { useRef, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { RiFileTextFill } from 'react-icons/ri'

const CommandBarSubMenu = () => {
  const {
    isSubMenuOpen,
    location,
    page: { page, sublinks },
  } = useSelector((state) => state.modals)
  const { closeSubMenu } = useActions()
  const containerRef = useRef(null)

  const memoizeMouseleaveHandler = useMemo(() => {
    return () => closeSubMenu()
  }, [])

  useEffect(() => {
    if (!containerRef.current) {
      return
    }
    const submenu = containerRef.current
    // Set the submenu position based on the location object
    submenu.style.left = `${location?.start}px`
    submenu.style.top = `${location?.bottom}px`
    // Add event listener for the 'mouseleave' event, using a memoized function
    submenu.addEventListener('mouseleave', memoizeMouseleaveHandler)

    return () => {
      // Remove event listener on clean up
      submenu.removeEventListener('mouseleave', memoizeMouseleaveHandler)
    }
  }, [location, memoizeMouseleaveHandler])

  const onHandleClick = (text) => {
    // logic when click on each link
    console.log(text)
    closeSubMenu()
  }

  return (
    <aside className={`${isSubMenuOpen ? 'commandbar-submenu show-submenu' : 'commandbar-submenu'}`} ref={containerRef}>
      {sublinks.map((link, index) => {
        const { icon, text, shortcut } = link
        return (
          <div className="submenu-item" key={index}>
            <div className="icon">{icon}</div>
            <div className="submenu-content">
              <button onClick={() => onHandleClick(text)}>{text}</button>
              <p>{shortcut}</p>
            </div>
          </div>
        )
      })}
    </aside>
  )
}
export default CommandBarSubMenu
