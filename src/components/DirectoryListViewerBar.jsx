import './DirectoryListViewerBar.scss'
import React from 'react'

const DirectoryListViewerBar = () => {
  return (
    <nav className="file_view-bar">
      <div className="drive-info">
        <select>
          <option value="c">c:</option>
          <option value="d">d:</option>
          <option value="e">e:</option>
        </select>
        <h6>[Drive_Name] 44 027 540 k of 249 160 552 k free</h6>
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
export default DirectoryListViewerBar
