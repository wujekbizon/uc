import './FileViewer.scss'
import React from 'react'

// Components
import { FileViewerBar } from './index'

const FileViewer = () => {
  return (
    <section className="file-viewer">
      <FileViewerBar />
      <div>FileViewer</div>
    </section>
  )
}
export default FileViewer
