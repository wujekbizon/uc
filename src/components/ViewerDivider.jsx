import './ViewerDivider.scss'
import React from 'react'
import {
  MdFileCopy,
  MdFolderCopy,
  MdEditSquare,
  MdDriveFileMove,
  MdFolderDelete,
  MdFileOpen,
  MdDeleteForever,
} from 'react-icons/md'
import { FcPackage, FcSettings } from 'react-icons/fc'

const ViewerDivider = () => {
  return (
    <div className="divider">
      <div>
        <div className="icon-container">
          <MdFileOpen className="icon" />
        </div>
        <div className="icon-container">
          <MdFileCopy className="icon" />
        </div>
        <div className="icon-container">
          <MdFolderCopy className="icon" />
        </div>
        <div className="icon-container">
          <MdEditSquare className="icon" />
        </div>
        <div className="icon-container">
          <MdDriveFileMove className="icon" />
        </div>
        <div className="icon-container">
          <MdFolderDelete className="icon" />
        </div>
        <div className="icon-container">
          <MdDeleteForever className="icon" />
        </div>
      </div>
      <div>
        <div className="icon-container">
          <FcPackage className="icon" />
        </div>
        <div className="icon-container">
          <FcSettings className="icon" />
        </div>
      </div>
    </div>
  )
}
export default ViewerDivider
