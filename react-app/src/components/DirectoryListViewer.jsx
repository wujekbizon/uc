import './DirectoryListViewer.scss'
import React, { useEffect, useState } from 'react'

// custom hooks
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { useCursorHandlers } from '../hooks/useCursorHandlers'

// Components
import { DirectoryListViewerBar, DirectoryEntry } from './index'
import { FILE_SORT_MODE_DATE, SORT_ASCENDING, SORT_DESCENDING } from '../api/DirectoryListData'

/**
 *
 * @param {DirectoryListData} data
 * @returns
 */

const DirectoryListViewer = ({ data, paneIndex, initSortMode, initSortOrder }) => {
  const { selectRef, debouncedScroll } = useSmoothScroll('.file-cursor-over', 20)
  const [entries, setEntries] = useState(['[..]'])
  const [sortMode, setSortMode] = useState(initSortMode)
  const [sortOrder, setSortOrder] = useState(initSortOrder)

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === SORT_DESCENDING ? SORT_ASCENDING : SORT_DESCENDING)
  }

  const sortEventHandler = (_sortMode) => {
    if (_sortMode === sortMode) {
      toggleSortOrder()
    } else {
      setSortMode(_sortMode)
    }
  }

  // use custoom hook for cursor navigation handlers
  useCursorHandlers({ data, paneIndex, selectRef, debouncedScroll, entries })

  useEffect(() => {
    data.refresh(sortMode, sortOrder).then(() => {
      setEntries(['..', ...data._entries])
    })
  }, [data, sortMode, sortOrder])

  return (
    <section className="file-viewer">
      <DirectoryListViewerBar setSortMode={sortEventHandler} setSortOrder />
      <div className="files-container" ref={selectRef}>
        {entries.map((entry, k) => (
          <DirectoryEntry key={k} entryIndex={k} paneIndex={paneIndex} entry={entry} />
        ))}
      </div>
    </section>
  )
}
export default DirectoryListViewer
