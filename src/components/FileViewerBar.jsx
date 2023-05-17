import './FileViewerBar.scss'
import React from 'react'

const FileViewerBar = () => {
  return (
    <nav className="file_view-bar">
      <div className="drive-info">
        <select>
          <option value="c">c:</option>
          <option value="d">d:</option>
          <option value="e">e:</option>
        </select>
        <h4>[Drive_Name] 44 027 540 k of 249 160 552 k free</h4>
      </div>
      <div className="btns-sort">
        <button>Name</button>
        <button>Ext</button>
        <button>Size</button>
        <button>Date</button>
      </div>
    </nav>
  )
}
export default FileViewerBar
