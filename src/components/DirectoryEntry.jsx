import './DirectoryListViewer.scss'
import React from 'react'
import { useActions } from '../hooks/useActions'
import { useSelector } from 'react-redux'
import { FcFolder, FcFile } from 'react-icons/fc'
import { ImArrowUp } from 'react-icons/im'

// Components
import fs from 'socket:fs/promises'
import { traverseDirectory } from '../helpers/fileSystem'

/**
 * File Entry
 * @see https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#class-fsdirent
 * @param {fs.Dirent|String} entry - File entry or '..'
 */

const DirectoryEntry = ({ paneIndex, entry, cursor_over, onEntryCallback }) => {
  const { focusedPaneIndex, cursorOver } = useSelector((state) => state.fileExplorers)
  const { directoryListData } = useSelector((state) => state.directoryListsData)
  const { setSelectedFile, addDirectoryToList } = useActions()

  const onEntryAction = (viewerIndex, entry) => {
    if (entry === '..' || entry.isDirectory()) {
      const newDirectory = traverseDirectory(viewerIndex, entry, directoryListData)
      addDirectoryToList(newDirectory)
    } else {
      setSelectedFile(entry)
    }
  }

  const onHandleClick = () => {
    onEntryAction(paneIndex, entry)
  }

  const stateCss = () => {
    return `file-container ${cursor_over ? 'file-cursor-over' : ''}${entry.selected ? 'file-selected' : ''}`
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
