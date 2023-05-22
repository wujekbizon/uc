import './DirectoryListViewer.scss'
import React, { useEffect, useState } from 'react'

// Components
import { DirectoryListViewerBar, FileViewerEntry } from './index'
import FileViewerData, { FILE_SORT_MODE_DATE, SORT_DESCENDING } from '../api/FileViewerData'

/**
 *
 * @param {FileViewerData} data
 * @returns
 */
const FileViewer = ({ data, focused }) => {
  const [entries, setEntries] = useState(['[..]'])
  const [cursorOver, setCursorOver] = useState(0)

  useEffect(() => {
    data.refresh(FILE_SORT_MODE_DATE, SORT_DESCENDING).then(() => {
      setEntries(() => ['..', ...data._entries])
      setCursorOver(0)
    })
  }, [])

  useEffect(() => {
    if (focused)
      window.addEventListener('keydown', handleKeyDown)

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, [focused])

  useEffect(() => {
    // unsubscribe and resubscribe when focus is lost, otherwise other pane can't be controlled with keyboard
    if (focused)
      window.addEventListener('keydown', handleKeyDown)
    else
      window.removeEventListener('keydown', handleKeyDown)

  }, [focused])

  const handleKeyDown = (event) => {
    if (!focused) return

    if (event.key === 'ArrowUp') {
      setCursorOver((prevCursor) => Math.max(prevCursor - 1, 0) )
    }
    if (event.key === 'ArrowDown') {
      setCursorOver((prevCursor) => Math.min(prevCursor + 1, entries.length - 1))
    }
  }

  return (
    <section className="file-viewer">
      <DirectoryListViewerBar />
      <div className="files-container">
        {entries.map((entry, k) => (
          <FileViewerEntry key={k} index={k} entry={entry} cursor_over={focused && (k === cursorOver)} />
        ))}
      </div>
    </section>
  )
}
export default FileViewer
