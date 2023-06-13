import './DirectoryListViewer.scss'
import React, { useCallback } from 'react'
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

// creates a memoized version of the component
const DirectoryEntry = React.memo(({ paneIndex, entry, entryIndex }) => {
  const { focusedPaneIndex, cursorOver } = useSelector((state) => state.fileExplorers)
  const { directoryListData } = useSelector((state) => state.directoryListsData)
  const { setSelectedFile, addDirectoryToList } = useActions()

  const cursor_over = focusedPaneIndex === paneIndex && entryIndex === cursorOver

  // useCallback used to memoize callback functions to prevent unnecessary
  // re-renders caused by passing new functions down to child components on each render.
  const onEntryAction = useCallback(
    (viewerIndex, entry) => {
      if (entry === '..' || entry.isDirectory()) {
        const newDirectory = traverseDirectory(viewerIndex, entry, directoryListData)
        addDirectoryToList(newDirectory)
      } else {
        setSelectedFile(entry)
      }
    },
    [addDirectoryToList, directoryListData, setSelectedFile]
  )

  const handleClick = () => {
    onEntryAction(paneIndex, entry)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && entry.isDirectory()) {
      event.preventDefault()
      onEntryAction(paneIndex, entry)
    }
  }

  return (
    <>
      {entry === '..' && (
        <div
          className={`file-container ${cursor_over ? 'file-cursor-over' : ''}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onDoubleClick={handleClick}
        >
          <ImArrowUp /> [..]
        </div>
      )}
      {typeof entry !== 'string' && entry.isDirectory() && (
        <div
          className={`file-container ${cursor_over ? 'file-cursor-over' : ''}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onDoubleClick={handleClick}
        >
          <FcFolder /> [{entry.name}]
        </div>
      )}
      {typeof entry !== 'string' && !entry.isDirectory() && (
        <div
          className={`file-container ${cursor_over ? 'file-cursor-over' : ''}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          <FcFile /> {entry.name}
        </div>
      )}
    </>
  )
})
export default DirectoryEntry
