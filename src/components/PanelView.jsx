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

  const refreshPanes = (paneIndexes) => {
    if (!Array.isArray(paneIndexes))
      paneIndexes = [paneIndexes]

    paneIndexes.forEach((viewerIndex) => {
      setFileViewerData((viewData) => {
        viewData[viewerIndex] = new DirectoryListData(viewData[viewerIndex].currentDirectory)
        return [...viewData]
      })
    })
  }

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
      
      let keyMap = {
        'F3': openViewFileModal,
        'F4': unhandledKey,
        'F5': copyFile,
        'F6': moveFile,
        'F7': newFolder,
        'F8': deleteFile
      }

      if (selectedFile) {
        event.preventDefault()
        if (keyMap[event.key] !== undefined) {
          keyMap[event.key](event)
        }
        return false
      }
    }
  }, [directoryViewCount, openViewFileModal, selectedFile])

  const unhandledKey = (event) => {
    console.log(`key not yet implemented: ${event.key}`)
  }

  const copyFile = async (event) => {
    if (selectedFile === '..') return

    // todo - copy file dialog, check if dest exists add (1) suffix
    // todo - chunked copy with progress dialog
    const destPaneIndex = (focusedPaneIndex + 1) % directoryViewCount
    if (await viewData[focusedPaneIndex].copyFile(selectedFile, viewData[destPaneIndex].currentDirectory)) {
      refreshPanes(destPaneIndex)
    }
  }

  const moveFile = (event) => {
    if (entry === '..') return
    // todo - same dialog as copy file
    // todo - refresh source, dest panes
  }

  const newFolder = (event) => {
    // todo - folder name dialog
    // todo - refresh current pane
  }

  const deleteFile = (event) => {
    if (entry === '..') return
    // todo - Are you sure dialog
    // todo - delete to recycle/trash bin if shift not pressed
    // todo - refresh current pane
  }

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
      {isViewFileModalOpen && 
      <ViewFileModal 
        viewData={viewData[focusedPaneIndex]}
        focusedPaneIndex={focusedPaneIndex}
        selectedFile={selectedFile} />}
    </section>
  )
}
export default PanelView
