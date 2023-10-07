import './DirectoryListViewerBar.scss'
import React from 'react'

import { FILE_SORT_MODE_DATE, FILE_SORT_MODE_EXT, FILE_SORT_MODE_NAME, FILE_SORT_MODE_SIZE } from '../api/DirectoryListData'

const DirectoryListViewerBar = ({ setSortMode, setSortOrder }) => {
  const handleNameClick = () => {
    setSortMode(FILE_SORT_MODE_NAME)
  }

  const handleExtClick = () => {
    setSortMode(FILE_SORT_MODE_EXT)
  }

  const handleSizeClick = () => {
    setSortMode(FILE_SORT_MODE_SIZE)
  }

  const handleDateClick = () => {
    setSortMode(FILE_SORT_MODE_DATE)
  }

  // todo(@mribbons): ui for current sort order (up/down arrow)
  // todo(@mribbons): drive listing and column headers should be in separate components
  // todo(@mribbons): populate drives/block devices
  // todo(@mribbons): get device metrics

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
