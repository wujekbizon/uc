import './MobileDirectoryListViewer.scss'
import React, { useEffect, useState } from 'react'

// Components
import { DirectoryEntry } from '../index'
import DirectoryListData, { FILE_SORT_MODE_DATE, SORT_DESCENDING } from '../../api/DirectoryListData'

/**
 *
 * @param {DirectoryListData} data
 * @returns
 */

const MobileDirectoryListViewer = ({ data, onEntryCallback }) => {
  const [entries, setEntries] = useState(['[..]'])

  useEffect(() => {
    data.refresh(FILE_SORT_MODE_DATE, SORT_DESCENDING).then(() => {
      setEntries(() => ['..', ...data._entries])
    })
  }, [data])

  return (
    <section className="mobile_file-viewer">
      <div className="mobile_files-container">
        {entries.map((entry, k) => (
          <DirectoryEntry key={k} index={k} entry={entry} onEntryCallback={onEntryCallback} />
        ))}
      </div>
    </section>
  )
}
export default MobileDirectoryListViewer
