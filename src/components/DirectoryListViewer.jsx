import './DirectoryListViewer.scss'
import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
// custom hooks
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { useActions } from '../hooks/useActions'

// Components
import { DirectoryListViewerBar, DirectoryEntry } from './index'
import DirectoryListData, { FILE_SORT_MODE_DATE, SORT_DESCENDING } from '../api/DirectoryListData'

/**
 *
 * @param {DirectoryListData} data
 * @returns
 */

const DirectoryListViewer = ({ data, focused, onEntryCallback, paneIndex }) => {
  const { cursorOver } = useSelector((state) => state.fileExplorers)
  const { updateCursorPosition, updateScrollCursorPosition } = useActions()
  const { selectRef, debouncedScroll } = useSmoothScroll('.file-cursor-over', 20)
  const [entries, setEntries] = useState(['[..]'])

  const memoizeHandlers = useMemo(() => {
    const handleKeyDown = (event) => {
      if (!focused) return
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        updateCursorPosition({ direction: 'UP', entries })
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        updateCursorPosition({ direction: 'DOWN', entries })
      }
      debouncedScroll()
    }
    const handleMouseWheel = (event) => {
      if (!focused) return
      updateScrollCursorPosition({ cursorDelta: Math.sign(-1 * event.wheelDelta), entries })
      debouncedScroll()
    }
    return { handleKeyDown, handleMouseWheel }
  }, [focused, debouncedScroll])

  // effects
  useEffect(() => {
    if (focused) {
      window.addEventListener('keydown', memoizeHandlers.handleKeyDown)
      window.addEventListener('mousewheel', memoizeHandlers.handleMouseWheel)

      selectRef?.current.addEventListener('wheel', (event) => {
        event.preventDefault()
      })
    }
    // cleanup this component
    return () => {
      window.removeEventListener('keydown', memoizeHandlers.handleKeyDown)
      window.removeEventListener('mousewheel', memoizeHandlers.handleMouseWheel)
      selectRef?.current?.removeEventListener('wheel', (event) => {
        event.preventDefault()
      })
    }
  }, [memoizeHandlers, focused])

  useEffect(() => {
    data.refresh(FILE_SORT_MODE_DATE, SORT_DESCENDING).then(() => {
      setEntries(['..', ...data._entries])
    })
  }, [data])

  return (
    <section className="file-viewer">
      <DirectoryListViewerBar />
      <div className="files-container" ref={selectRef}>
        {entries.map((entry, k) => (
          <DirectoryEntry
            key={k}
            paneIndex={paneIndex}
            entry={entry}
            cursor_over={focused && k === cursorOver}
            // onEntryCallback={onEntryCallback}
          />
        ))}
      </div>
    </section>
  )
}
export default DirectoryListViewer
