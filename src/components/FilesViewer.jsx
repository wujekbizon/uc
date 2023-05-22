import './FilesViewer.scss'
import React, { useEffect, useState } from 'react'

// Components
import { ViewerDivider, DirectoryListViewer } from './index'
import FileViewerData from '../api/FileViewerData'

const FilesViewer = () => {
  const directoryViewCount = 2
  const [focused, setFocused] = useState(0)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [])

  const handleKeyDown = (event) => {
    event.preventDefault()
    if (event.key === 'Tab') {
      setFocused((focused) => {
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
      <DirectoryListViewer data={new FileViewerData()} index={0} focused={focused === 0} />
      <ViewerDivider />
      <DirectoryListViewer data={new FileViewerData()} index={1} focused={focused === 1} />
    </section>
  )
}
export default FilesViewer
