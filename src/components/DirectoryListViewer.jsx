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
      let newEntries = ['..', ...data._entries];
      console.log(`new entries: ${newEntries.length}`)
      setEntries((prev) => {return newEntries})
      setCursorOver(0)
    })
  }, [])

  React.useEffect(() => {
    if (focused)
      window.addEventListener('keydown', handleKeyDown)

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    };
  }, []);

  React.useEffect(() => {
    // unsubscribe and resubscribe when focus is lost, otherwise other pane can't be controlled with keyboard
    console.log(`DirectoryListViewer ${index} up, focus change: ${focused}`)
    if (focused)
      window.addEventListener('keydown', handleKeyDown)
    else    
      window.removeEventListener('keydown', handleKeyDown)

  }, [focused])

  const handleKeyDown = (event) => {    
    if (!focused) return


    if (event.key === 'ArrowUp') {
      console.log(`DirectoryListViewer up: ${index}, ${Math.max(cursorOver - 1, 0)}`)
      setCursorOver((prevCursor) => Math.max(prevCursor - 1, 0) )
    }
    if (event.key === 'ArrowDown') {
      console.log(`DirectoryListViewer down: ${index}, ${entries.length}`)
      setCursorOver((prevCursor) => Math.min(prevCursor + 1, entries.length - 1))
    }
  };

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
