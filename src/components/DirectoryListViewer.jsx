import './DirectoryListViewer.scss'
import React, { useEffect, useState } from 'react'

// Components
import { DirectoryListViewerBar, FileViewerEntry } from './index'
import FileViewerData from '../api/FileViewerData'

/**
 *
 * @param {FileViewerData} data
 * @returns
 */
const FileViewer = ({ data, index, focused }) => {
  const [entries, setEntries] = useState(['[..]'])
  const [cursorOver, setCursorOver] = useState(0)

  useEffect(() => {
    data.refresh().then(() => {
      setEntries((prevEntries) => ['..', ...prevEntries, ...data._entries])
    })
  }, [])

  React.useEffect(() => {
    if (focused)
      window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    console.log(`directory ${index} focus change: ${focused}`)
    if (focused)
      window.addEventListener('keydown', handleKeyDown);
    else    
      window.removeEventListener('keydown', handleKeyDown);

  }, [focused])

  const handleKeyDown = (event) => {    
    if (!focused) return

    if (event.key === 'ArrowUp')
      setCursorOver((prevCursor) => prevCursor - 1 )
    if (event.key === 'ArrowDown')
      setCursorOver((prevCursor) => prevCursor + 1 )
  };

  return (
    <section className="file-viewer">
      <DirectoryListViewerBar />
      <div className="files-container">
        {entries.map((entry, k) => (
          <FileViewerEntry key={k} entry={entry} cursor_over={focused && (k === cursorOver)} />
        ))}
      </div>
    </section>
  )
}
export default FileViewer
