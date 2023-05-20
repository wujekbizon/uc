import './FilesViewer.scss'
import React from 'react'

// Components
import { ViewerDivider, DirectoryListViewer } from './index'
import FileViewerData from '../api/FileViewerData'

const FilesViewer = () => {
  return (
    <section className="files-viewer">
      <DirectoryListViewer data={new FileViewerData()} />
      <ViewerDivider />
      <DirectoryListViewer data={new FileViewerData()} />
    </section>
  )
}
export default FilesViewer
