import './PanelView.scss'
import React, { useEffect, useState, useMemo, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'

// Components
import { ViewerDivider, DirectoryListViewer, ViewFileModal } from './index'
import DirectoryListData from '../api/DirectoryListData'

// todo: provide list of starting directories from saved state
const initFileViewerData = (n) => {
  let a = []
  while (a.length < n) {
    a.push(new DirectoryListData())
  }

  return a
}

const PanelView = () => {
  const directoryViewCount = 2
  const [focusedPaneIndex, setFocusedPaneIndex] = useState(0)
  const [viewData, setFileViewerData] = useState(initFileViewerData(directoryViewCount))
  const [selectedFile, setSelectedFile] = useState(null)
  const { isViewFileModalOpen } = useSelector((state) => state.modals)
  const { openViewFileModal } = useActions()

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
      event.preventDefault()
      if (event.key === 'F3' && selectedFile) {
        openViewFileModal()
      }
    }
  }, [directoryViewCount, openViewFileModal, selectedFile])

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
    <section className="panel-view">
      {viewData.map((data, index) => (
        <Fragment key={index}>
          <DirectoryListViewer
            data={data}
            index={index}
            focused={focusedPaneIndex === index}
            onEntryCallback={(entry) => onEntryAction(index, entry)}
          />
          {index !== viewData.length - 1 && <ViewerDivider />}
        </Fragment>
      ))}
      {isViewFileModalOpen && <ViewFileModal selectedFile={selectedFile} />}
    </section>
  )
}
export default PanelView
