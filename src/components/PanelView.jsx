import './PanelView.scss'
import React, { useEffect, useState, useMemo } from 'react'

// Components
import { ViewerDivider, DirectoryListViewer } from './index'
import DirectoryListData from '../api/DirectoryListData'

// todo: provide list of starting directories from saved state
const initFileViewerData = (n) => {
  let a = []
  while (a.length < n) {
    a.push(new FileViewerData())
  }

  return a
}

const FilesViewer = () => {
  const directoryViewCount = 2
  const [focusedPaneIndex, setFocusedPaneIndex] = useState(0)
  const [viewData, setFileViewerData] = useState(initFileViewerData(directoryViewCount))

  // wrapping in useMemo so we can avoid unnecessary re-renders and improve the performance.
  const memoizeHandleKeyDown = useMemo(() => {
    return (event) => {
      event.preventDefault()
      if (event.key === 'Tab') {
        setFocusedPaneIndex((focused) => {
          focused++
          if (focused >= directoryViewCount) {
            focused = 0
          }
          return focused
        })
      }
    }
  }, [directoryViewCount])

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
      console.log(`file: ${entry.name}`)
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
    <section className="files-viewer">
      <DirectoryListViewer data={viewData[0]} index={0} focused={focusedPaneIndex === 0} onEntryCallback={(entry) => onEntryAction(0, entry) } />
    <section className="panel-view">
      <DirectoryListViewer data={new DirectoryListData()} index={0} focused={focusedPaneIndex === 0} />
      <ViewerDivider />
      <DirectoryListViewer data={viewData[1]} index={1} focused={focusedPaneIndex === 1} onEntryCallback={(entry) => onEntryAction(1, entry) } />
      <DirectoryListViewer data={new DirectoryListData()} index={1} focused={focusedPaneIndex === 1} />
    </section>
  )
}
export default PanelView
