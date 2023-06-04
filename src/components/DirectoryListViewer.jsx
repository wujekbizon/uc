import './DirectoryListViewer.scss'
import React, { useEffect, useState, useMemo } from 'react'
// custom hooks
import { useSmoothScroll } from '../hooks/useSmoothScroll'

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
  const { selectRef, debouncedScroll } = useSmoothScroll('.file-cursor-over', 20)

  // useMemo will memoize the function and recalculate it only when either `focused`,`entries.length` or
  // `debouncedScroll` change, so we can avoid unnecessary re-renders and improve the performance.
  const memoizeHandleKeyDown = useMemo(() => {
    return (event) => {
      if (!focused) return

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setCursorOver((prevCursor) => Math.max(prevCursor - 1, 0))
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setCursorOver((prevCursor) => Math.min(prevCursor + 1, entries.length - 1))
      }
      // calling debouncedScroll fn
      debouncedScroll()
    }
  }, [focused, entries.length, debouncedScroll])

  const memoizeHandleMouseWheel = useMemo(() => {
    return (event) => {
      if (!focused) return
      // event.preventDefault()

      // Calculate the new cursor position based on the mouse wheel delta
      const cursorDelta = Math.sign(-1 * event.wheelDelta)
      setCursorOver((prevCursor) => {
        const minCursor = 0
        const maxCursor = entries.length - 1
        const newCursor = Math.max(Math.min(prevCursor + cursorDelta, maxCursor), minCursor)
        // calling debouncedScroll fn
        debouncedScroll()
        return newCursor
      })
    }
  }, [focused, entries.length, debouncedScroll])

  useEffect(() => {
    data.refresh(FILE_SORT_MODE_DATE, SORT_DESCENDING).then(() => {
      setEntries(() => ['..', ...data._entries])
      setCursorOver(0)
    })
  }, [data])

  useEffect(() => {
    if (focused) {
      window.addEventListener('keydown', memoizeHandleKeyDown)
      window.addEventListener('mousewheel', memoizeHandleMouseWheel)

      selectRef?.current.addEventListener('wheel', (event) => {
        event.preventDefault()
      })
    }
    // cleanup this component
    return () => {
      window.removeEventListener('keydown', memoizeHandleKeyDown)
      window.removeEventListener('mousewheel', memoizeHandleMouseWheel)
      selectRef?.current.removeEventListener('wheel', (event) => {
        event.preventDefault()
      })
    }
  }, [memoizeHandleKeyDown, focused, memoizeHandleMouseWheel])

  return (
    <section className="file-viewer">
      <DirectoryListViewerBar />
      <div className="files-container" ref={selectRef}>
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
