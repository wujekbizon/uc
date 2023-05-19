import './FilesViewer.scss'
import React from 'react'

// Components
import { ViewerDivider, FileViewer } from './index'
import FileViewerData from '../api/FileViewerData'

const FilesViewer = () => {
  return (
    <section className="files-viewer">
      <FileViewer data={new FileViewerData()} />
      <ViewerDivider />
      <FileViewer data={new FileViewerData()} />
    </section>
  )
}
export default FilesViewer
