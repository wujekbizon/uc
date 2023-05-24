import './DirectoryListViewer.scss'
import React, { useEffect, useState, useMemo } from 'react'

// Components
import { DirectoryListViewerBar, DirectoryEntry } from './index'
import DirectoryListData, { FILE_SORT_MODE_DATE, SORT_DESCENDING } from '../api/DirectoryListData'

/**
 *
 * @param {DirectoryListData} data
 * @returns
 */

const DirectoryListViewer = ({ data, focused, onEntryCallback }) => {
  const [entries, setEntries] = useState(['[..]'])
  const [cursorOver, setCursorOver] = useState(0)

  // useMemo will memoize the function and recalculate it only when either `focused` or `entries.length`
  // change, so we can avoid unnecessary re-renders and improve the performance.
  const memoizeHandleKeyDown = useMemo(() => {
    return (event) => {
      if (!focused) return

      if (event.key === 'ArrowUp') {
        setCursorOver((prevCursor) => Math.max(prevCursor - 1, 0))
      }
      if (event.key === 'ArrowDown') {
        setCursorOver((prevCursor) => Math.min(prevCursor + 1, entries.length - 1))
      }
    }
  }, [focused, entries.length])

  useEffect(() => {
    data.refresh(FILE_SORT_MODE_DATE, SORT_DESCENDING).then(() => {
      setEntries(() => ['..', ...data._entries])
      setCursorOver(0)
    })
  }, [data])

  useEffect(() => {
    if (focused) window.addEventListener('keydown', memoizeHandleKeyDown)

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', memoizeHandleKeyDown)
    }
  }, [memoizeHandleKeyDown])

  return (
    <section className="file-viewer">
      <DirectoryListViewerBar />
      <div className="files-container">
        {entries.map((entry, k) => (
          <DirectoryEntry
            key={k}
            index={k}
            entry={entry}
            cursor_over={focused && k === cursorOver}
            onEntryCallback={onEntryCallback}
          />
        ))}
      </div>
    </section>
  )
}
export default DirectoryListViewer
