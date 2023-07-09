import './DirectoryListViewerBar.scss'
import React from 'react'

const DirectoryListViewerBar = () => {
  const handleNameClick = () => {
    console.log('Sort by name')
  }

  const handleExtClick = () => {
    console.log('Sort by ext')
  }

  const handleSizeClick = () => {
    console.log('Sort by size')
  }

  const handleDateClick = () => {
    console.log('Sort by date')
  }

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
        <button className="btn-name" onClick={handleNameClick}>
          Name
        </button>
        <button className="btn-extension" onClick={handleExtClick}>
          Ext
        </button>
        <button className="btn-size" onClick={handleSizeClick}>
          Size
        </button>
        <button className="btn-date" onClick={handleDateClick}>
          Date
        </button>
      </div>
    </nav>
  )
}
export default DirectoryListViewerBar
