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
  // todo Greg, handle onClick events, also do the same for the Key press .. 'Enter' , F3 or F4 ?
  // Later we'll move that to Redux store, so whenever click or press key, event that occurs it will trigger an action
  const onHandleUpDirectoryLevel = () => {
    console.log('Going up directory level')
  }
  const onHandleInsideDirectory = () => {
    console.log('Going inside directory')
  }
  const onHandleFileEdit = () => {
    console.log('Edit file')
  }

  const stateCss = () => {
    return `file-container ${cursor_over ? ' file-cursor-over' : ''}${entry.selected ? ' file-selected' : ''}`
  }

  const onClick = () => {
    onEntryCallback(entry)
  }

  return (
    <>
      {entry === '..' && (
        <div className={stateCss()} onClick={onClick}>
          <ImArrowUp /> [..]
        </div>
      )}
      {typeof entry !== 'string' && entry.isDirectory() && (
        <div className={stateCss()} onClick={onClick}>
          <FcFolder /> [{entry.name}]
        </div>
      )}
      {typeof entry !== 'string' && !entry.isDirectory() && (
        <div className={stateCss()} onClick={onClick}>
          <FcFile /> {entry.name}
        </div>
      )}
    </>
  )
}

export default DirectoryEntry
