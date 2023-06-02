import './DirectoryListViewer.scss'
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

const DirectoryEntry = ({ index, entry, cursor_over, onEntryCallback }) => {
  const onHandleClick = () => {
    onEntryCallback(entry)
  }

  const stateCss = () => {
    return `file-container ${cursor_over ? ' file-cursor-over' : ''}${entry.selected ? ' file-selected' : ''}`
  }

  return (
    <>
      {entry === '..' && (
        <div className={stateCss()} onDoubleClick={onHandleClick}>
          <ImArrowUp /> [..]
        </div>
      )}
      {typeof entry !== 'string' && entry.isDirectory() && (
        <div className={stateCss()} onDoubleClick={onHandleClick}>
          <FcFolder /> [{entry.name}]
        </div>
      )}
      {typeof entry !== 'string' && !entry.isDirectory() && (
        <div className={stateCss()} onClick={onHandleClick}>
          <FcFile /> {entry.name}
        </div>
      )}
    </>
  )
}

export default DirectoryEntry
