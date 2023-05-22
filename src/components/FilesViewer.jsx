import './FilesViewer.scss'
import React, { useEffect, useState } from 'react'

// Components
import { ViewerDivider, DirectoryListViewer } from './index'
import FileViewerData from '../api/FileViewerData'

const FilesViewer = () => {
  const directoryViewCount = 2
  const [focusedPaneIndex, setFocusedPaneIndex] = useState(0)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [])

  const handleKeyDown = (event) => {
    event.preventDefault()
    if (event.key === 'Tab') {
      setFocusedPaneIndex((focused) => {
        focused++
        if (focused >= directoryViewCount) {
          focused = 0
        }

        return focused
      })
    }
  };

  return (
    <section className="files-viewer">
      <DirectoryListViewer data={new FileViewerData()} index={0} focused={focusedPaneIndex === 0} />
      <ViewerDivider />
      <DirectoryListViewer data={new FileViewerData()} index={1} focused={focusedPaneIndex === 1} />
    </section>
  )
}
export default FilesViewer
