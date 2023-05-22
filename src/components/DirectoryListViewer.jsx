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
const FileViewer = ({ data }) => {
  const [entries, setEntries] = useState(['[..]'])

  useEffect(() => {
    data.refresh(FILE_SORT_MODE_DATE, SORT_DESCENDING).then(() => {
      setEntries(() => ['..', ...data._entries])
    })
  }, [])

  return (
    <section className="file-viewer">
      <DirectoryListViewerBar />
      <div className="files-container">
        {entries.map((entry, k) => (
          <FileViewerEntry key={k} entry={entry} />
        ))}
      </div>
    </section>
  )
}
export default FileViewer
