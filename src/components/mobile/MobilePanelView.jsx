import './MobilePanelView.scss'
import React, { useEffect, useState, useMemo, Fragment } from 'react'

// Components
import { MobileDirectoryListViewer } from './index'
import DirectoryListData from '../../api/DirectoryListData'

// todo: provide list of starting directories from saved state
const initFileViewerData = (n) => {
  let a = []
  while (a.length < n) {
    a.push(new DirectoryListData())
  }

  return a
}

const MobilePanelView = () => {
  const directoryViewCount = 2
  const [viewData, setFileViewerData] = useState(initFileViewerData(directoryViewCount))
  const [selectedFile, setSelectedFile] = useState(null)

  const onEntryAction = (viewerIndex, entry) => {
    if (entry === '..' || entry.isDirectory()) {
      traverseDirectory(viewerIndex, entry)
    } else {
      setSelectedFile(entry)
    }
  }

  const traverseDirectory = (viewerIndex, entry) => {
    // todo - path history
    setFileViewerData((viewData) => {
      viewData[viewerIndex] = viewData[viewerIndex].traverse(entry)
      return [...viewData]
    })
  }

  return (
    <section className="mobile_panel-view">
      {viewData.map((data, index) => (
        <Fragment key={index}>
          <MobileDirectoryListViewer
            data={data}
            index={index}
            onEntryCallback={(entry) => onEntryAction(index, entry)}
          />
        </Fragment>
      ))}
    </section>
  )
}
export default MobilePanelView
