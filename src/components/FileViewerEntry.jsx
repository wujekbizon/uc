import './FileViewer.scss'
import React from 'react'
import { FcFolder, FcFile } from 'react-icons/fc'
import { ImArrowUp } from 'react-icons/im'

// Components
import fs from 'socket:fs/promises'

/**
 * File Entry 
 * @see https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#class-fsdirent
 * @param {fs.Dirent|String} entry - File entry or '..'
 */
export const FileViewerEntry = (props) => {
  let entry = props.entry
  let icon
  let text
  if (entry === '..') {
    icon = <ImArrowUp key={0} />
    text = '[..]'
  } else if (typeof entry !== 'string') {
    if (entry.isDirectory()) {
      icon = <FcFolder key={0} />
      text = `[${entry.name}]`
    } else {
      icon = <FcFile key={0} />
      text = entry.name
    }
  }

  let children = [icon, <div key={1}>{text}</div>]

  return (
    <div className="file-container">
      {children}
    </div>
  )
}