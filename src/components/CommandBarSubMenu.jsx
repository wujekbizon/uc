import './CommandBarSubMenu.scss'
import React, { useRef, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { RiFileTextFill } from 'react-icons/ri'

const CommandBarSubMenu = () => {
  const { isSubMenuOpen, location } = useSelector((state) => state.modals)
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

    submenu.style.left = `${location.center}px`
    submenu.style.top = `${location.bottom}px`

    submenu.addEventListener('mouseleave', memoizeMouseleaveHandler)

    return () => {
      submenu.removeEventListener('mouseleave', memoizeMouseleaveHandler)
    }
  }, [location, memoizeMouseleaveHandler])

  return (
    <aside className={`${isSubMenuOpen ? 'commandbar-submenu show-submenu' : 'commandbar-submenu'}`} ref={containerRef}>
      <div className="submenu-item">
        <RiFileTextFill className="icon" />
        <h4>Change Attributes....</h4>
        <p>Alt + F5</p>
        <span>{`>`}</span>
      </div>
      <div className="submenu-item">
        <RiFileTextFill className="icon" />
        <h4>Change Attributes....</h4>
        <p>Alt + F5</p>
      </div>
      <div className="submenu-item">
        <RiFileTextFill className="icon" />
        <h4>Change Attributes....</h4>
        <p>Alt + F5</p>
      </div>
      <div className="submenu-item">
        <RiFileTextFill className="icon" />
        <h4>Change Attributes....</h4>
        <p>Alt + F5</p>
      </div>
      <div className="submenu-item">
        <RiFileTextFill className="icon" />
        <h4>Change Attributes....</h4>
        <p>Alt + F5</p>
      </div>
      <div className="submenu-item">
        <RiFileTextFill className="icon" />
        <h4>Change Attributes....</h4>
        <p>Alt + F5</p>
      </div>
      <div className="submenu-item">
        <RiFileTextFill className="icon" />
        <h4>Change Attributes....</h4>
        <p>Alt + F5</p>
      </div>
      <div className="submenu-item">
        <RiFileTextFill className="icon" />
        <h4>Change Attributes....</h4>
        <p>Alt + F5</p>
      </div>
    </aside>
  )
}
export default CommandBarSubMenu
