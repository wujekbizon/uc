import './MobilePanelView.scss'
import React, { useEffect, useState, useMemo, Fragment } from 'react'
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from 'react-icons/bs'
// Components
import { MobileDirectoryListViewer, MobileViewerDivider } from './index'
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
  const [focusedPaneIndex, setFocusedPaneIndex] = useState(0)
  const [viewData, setFileViewerData] = useState(initFileViewerData(directoryViewCount))
  const [selectedFile, setSelectedFile] = useState(null)

  // wrapping in useMemo so we can avoid unnecessary re-renders and improve the performance.
  const memoizeHandleKeyDown = useMemo(() => {
    return (event) => {
      if (event.key === 'Tab') {
        event.preventDefault()
        setFocusedPaneIndex((focused) => {
          focused++
          if (focused >= directoryViewCount) {
            focused = 0
          }
          return focused
        })
      }
    }
  }, [directoryViewCount, selectedFile])

  useEffect(() => {
    window.addEventListener('keydown', memoizeHandleKeyDown)

    return () => {
      window.removeEventListener('keydown', memoizeHandleKeyDown)
    }
  }, [memoizeHandleKeyDown])

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
            focused={focusedPaneIndex === index}
            onEntryCallback={(entry) => onEntryAction(index, entry)}
          />
          {index !== viewData.length - 1 && <MobileViewerDivider />}
          {/* {focusedPaneIndex % 2 ? (
            <BsFillArrowUpSquareFill className="icon" />
          ) : (
            <BsFillArrowDownSquareFill className="icon" />
          )} */}
        </Fragment>
      ))}
    </section>
  )
}
export default MobilePanelView
