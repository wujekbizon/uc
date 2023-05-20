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

const FileViewerEntry = ({ entry }) => {
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

  return (
    <>
      {entry === '..' && (
        <div className="file-container" onClick={onHandleUpDirectoryLevel}>
          <ImArrowUp /> [..]
        </div>
      )}
      {typeof entry !== 'string' && entry.isDirectory() && (
        <div className="file-container" onClick={onHandleInsideDirectory}>
          <FcFolder /> [{entry.name}]
        </div>
      )}
      {typeof entry !== 'string' && (
        <div className="file-container" onClick={onHandleFileEdit}>
          <FcFile /> {entry.name}
        </div>
      )}
    </>
  )
}

export default FileViewerEntry
