import './DirectoryListViewer.scss'
import React, { useEffect, useState } from 'react'

// custom hooks
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { useCursorHandlers } from '../hooks/useCursorHandlers'

// Components
import { DirectoryListViewerBar, DirectoryEntry } from './index'
import { FILE_SORT_MODE_DATE, SORT_DESCENDING } from '../api/DirectoryListData'

/**
 *
 * @param {DirectoryListData} data
 * @returns
 */

const DirectoryListViewer = ({ data, paneIndex }) => {
  const { selectRef, debouncedScroll } = useSmoothScroll('.file-cursor-over', 20)
  const [entries, setEntries] = useState(['[..]'])

  // use custoom hook for cursor navigation handlers
  useCursorHandlers({ data, paneIndex, selectRef, debouncedScroll, entries })

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
          <DirectoryEntry key={k} entryIndex={k} paneIndex={paneIndex} entry={entry} />
        ))}
      </div>
    </section>
  )
}
export default DirectoryListViewer
