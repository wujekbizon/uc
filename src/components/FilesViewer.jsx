import './FilesViewer.scss'
import React, { useEffect, useState, useMemo } from 'react'

// Components
import { ViewerDivider, DirectoryListViewer } from './index'
import FileViewerData from '../api/FileViewerData'

const FilesViewer = () => {
  const directoryViewCount = 2
  const [focusedPaneIndex, setFocusedPaneIndex] = useState(0)

  // wrapping in useMemo so we can avoid unnecessary re-renders and improve the performance.
  const memoizeHandleKeyDown = useMemo(() => {
    return (event) => {
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
    }
  }, [directoryViewCount])

  useEffect(() => {
    window.addEventListener('keydown', memoizeHandleKeyDown)

    return () => {
      window.removeEventListener('keydown', memoizeHandleKeyDown)
    }
  }, [memoizeHandleKeyDown])

  return (
    <section className="files-viewer">
      <DirectoryListViewer data={new FileViewerData()} index={0} focused={focusedPaneIndex === 0} />
      <ViewerDivider />
      <DirectoryListViewer data={new FileViewerData()} index={1} focused={focusedPaneIndex === 1} />
    </section>
  )
}
export default FilesViewer
