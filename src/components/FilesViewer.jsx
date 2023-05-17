import './FilesViewer.scss'
import React from 'react'

// Components
import { ViewerDivider, FileViewer } from './index'

const FilesViewer = () => {
  return (
    <section className="files-viewer">
      <FileViewer />
      <ViewerDivider />
      <FileViewer />
    </section>
  )
}
export default FilesViewer
