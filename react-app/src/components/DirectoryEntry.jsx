import './DirectoryListViewer.scss'
import React, { useCallback } from 'react'
import { useActions } from '../hooks/useActions'
import { useSelector } from 'react-redux'
import { FcFolder, FcFile } from 'react-icons/fc'
import { ImArrowUp } from 'react-icons/im'

// Components
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
  const { setFocus, setSelectedFile, addDirectoryToList } = useActions()

  const cursor_over = focusedPaneIndex === paneIndex && entryIndex === cursorOver[paneIndex]

  // useCallback used to memoize callback functions to prevent unnecessary
  // re-renders caused by passing new functions down to child components on each render.
  const onEntryAction = useCallback(
    (entry) => {
      setFocus(paneIndex, entry, entryIndex)
      setSelectedFile({entry, entryIndex})
    },
    [setSelectedFile]
  )

  const onEntryDoubleClickAction = useCallback(
      (viewerIndex, entry) => {
      if (entry === '..' || entry.isDirectory) {
        const newDirectory = traverseDirectory(viewerIndex, entry, directoryListData)
        addDirectoryToList(newDirectory)
      }
    },
    [addDirectoryToList, directoryListData]
  )

  const handleDoubleClick = () => {
    onEntryDoubleClickAction(paneIndex, entry)
  }

  const handleClick = () => {
    onEntryAction(entry)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && entry.isDirectory) {
      event.preventDefault()
      onEntryAction(paneIndex, entry)
    }
  }

  const date = new Date(entry?.mtime)
  const humanReadableDate = entry?.mtime > 0 ? date.toLocaleDateString() + ' ' + date.toLocaleTimeString(undefined, {hourCycle: 'h24', hour: 'numeric', minute: 'numeric'}) : ''

  return (
    <>
      {entry === '..' && (
        <div
          className={`file-container ${cursor_over ? 'file-cursor-over' : ''}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          <ImArrowUp /> [..]
        </div>
      )}
      {typeof entry !== 'string' && entry.isDirectory && (
        <div
          className={`file-container ${cursor_over ? 'file-cursor-over' : ''}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          <div className="name-container">
            <FcFolder className="icon" />[{entry.name}]
          </div>
          <div className="ext-container" />
          <div className="size-container">{`<DIR>`}</div>
          <div className="date-container">{humanReadableDate}</div>
        </div>
      )}
      {typeof entry !== 'string' && !entry.isDirectory && (
        <div
          className={`file-container ${cursor_over ? 'file-cursor-over' : ''}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          <div className="name-container">
            <FcFile className="icon" /> <h4>{entry?.name}</h4>
          </div>
          <div className="ext-container">
            <span>{entry?.ext}</span>
          </div>
          <div className="size-container">{entry?.size}kb</div>
          <div className="date-container">{humanReadableDate}</div>
        </div>
      )}
    </>
  )
})
export default DirectoryEntry
