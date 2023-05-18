import './FileViewer.scss'
import React from 'react'
import { FcFolder, FcFile } from 'react-icons/fc'
import { ImArrowUp } from 'react-icons/im'

// Components
import { FileViewerBar } from './index'

const FileViewer = () => {
  return (
    <section className="file-viewer">
      <FileViewerBar />
      <div className="files-container">
        <div className="file-container">
          <ImArrowUp /> [..]
        </div>
        <div className="file-container">
          <FcFolder /> [FolderName]
        </div>
        <div className="file-container">
          <FcFolder /> [FolderName]
        </div>
        <div className="file-container">
          <FcFolder /> [FolderName]
        </div>
        <div className="file-container">
          <FcFolder /> [FolderName]
        </div>
        <div className="file-container">
          <FcFolder /> [FolderName]
        </div>
        <div className="file-container">
          <FcFolder /> [FolderName]
        </div>
        <div className="file-container">
          <FcFolder /> [FolderName]
        </div>
        <div className="file-container">
          <FcFolder /> [FolderName]
        </div>
        <div className="file-container">
          <FcFolder /> [FolderName]
        </div>
        <div className="file-container">
          <FcFolder /> [FolderName]
        </div>
        <div className="file-container">
          <FcFile /> test.pdf
        </div>
        <div className="file-container">
          <FcFile /> test.pdf
        </div>
        <div className="file-container">
          <FcFile /> test.pdf
        </div>
        <div className="file-container">
          <FcFile /> test.pdf
        </div>
        <div className="file-container">
          <FcFile /> test.pdf
        </div>
        <div className="file-container">
          <FcFile /> test.pdf
        </div>
        <div className="file-container">
          <FcFile /> test.pdf
        </div>
        <div className="file-container">
          <FcFile /> test.pdf
        </div>
        <div className="file-container">
          <FcFile /> test.pdf
        </div>
      </div>
    </section>
  )
}
export default FileViewer
