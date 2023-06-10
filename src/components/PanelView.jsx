import './PanelView.scss'
import React, { useEffect, useMemo, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { traverseDirectory } from '../helpers/fileSystem'
// Components
import { ViewerDivider, DirectoryListViewer, ViewFileModal } from './index'
import DirectoryListData from '../api/DirectoryListData'

const PanelView = () => {
  const { focusedPaneIndex, selectedFile, directoryViewCount } = useSelector((state) => state.fileExplorers)
  const { directoryListData } = useSelector((state) => state.directoryListsData)
  const { isViewFileModalOpen } = useSelector((state) => state.modals)
  const { openViewFileModal, toggleFocus, setSelectedFile, fetchDirectoryList, addDirectoryToList } = useActions()

  // fetching a list of data whenever directoryListData or directoryViewCount change
  useEffect(() => {
    fetchDirectoryList(directoryViewCount)
  }, [directoryViewCount])

  const allPanes = []
  for (let x = 0; x < directoryViewCount; ++x) {
    allPanes.push(x)
  }

  const refreshPanes = (paneIndexes) => {
    if (!Array.isArray(paneIndexes)) paneIndexes = [paneIndexes]

    paneIndexes.forEach((viewerIndex) => {
      setFileViewerData((viewData) => {
        viewData[viewerIndex] = new DirectoryListData(viewData[viewerIndex].currentDirectory)
        return [...viewData]
      })
    })
  }

  // get the index of the next unfocused pane
  const getOppositePaneIndex = () => {
    return (focusedPaneIndex + 1) % directoryViewCount
  }

  // wrapping in useMemo so we can avoid unnecessary re-renders and improve the performance.
  const memoizeHandleKeyDown = useMemo(() => {
    return (event) => {
      if (event.key === 'Tab') {
        event.preventDefault()
        const nextIndex = focusedPaneIndex === 0 ? 1 : 0
        toggleFocus(nextIndex)
      }

      let keyMap = {
        F3: openViewFileModal,
        F4: unhandledKey,
        F5: copyFile,
        F6: moveFile,
        F7: newFolder,
        F8: deleteFile,
      }

      if (selectedFile) {
        event.preventDefault()
        if (keyMap[event.key] !== undefined) {
          keyMap[event.key](event)
        }
        return false
      }
    }
  }, [directoryViewCount, openViewFileModal, selectedFile, toggleFocus, focusedPaneIndex])

  const unhandledKey = (event) => {
    console.log(`key not yet implemented: ${event.key}`)
  }

  const copyFile = async (event) => {
    if (selectedFile === '..') return

    // todo - copy file dialog, check if dest exists add (1) suffix
    // todo - chunked copy with progress dialog
    const destPaneIndex = getOppositePaneIndex()
    if (await viewData[focusedPaneIndex].copyFile(selectedFile, viewData[destPaneIndex].currentDirectory)) {
      refreshPanes(destPaneIndex)
    }
  }

  const moveFile = async (event) => {
    if (selectedFile === '..') return
    // todo - same dialog as copy file
    // todo - refresh source, dest panes
    const destPaneIndex = getOppositePaneIndex()
    if (await viewData[focusedPaneIndex].moveFile(selectedFile, viewData[destPaneIndex].currentDirectory)) {
      refreshPanes(allPanes)
    }
  }

  const newFolder = async (event) => {
    // todo - folder name dialog, takes current entry as starting point for new folder name, all text selected for easy overwrite
    // todo - refresh current pane
    if (await viewData[focusedPaneIndex].newFolder('new\\path')) {
      refreshPanes(focusedPaneIndex)
    }
  }

  const deleteFile = async (event) => {
    if (selectedFile === '..') return
    // todo - Are you sure dialog
    // todo - delete to recycle/trash bin if shift not pressed
    // todo - refresh current pane
    if (await viewData[focusedPaneIndex].deleteFile(selectedFile)) {
      refreshPanes(focusedPaneIndex)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', memoizeHandleKeyDown)

    return () => {
      window.removeEventListener('keydown', memoizeHandleKeyDown)
    }
  }, [memoizeHandleKeyDown])

  const onEntryAction = (viewerIndex, entry) => {
    if (entry === '..' || entry.isDirectory()) {
      const newDirectory = traverseDirectory(viewerIndex, entry, directoryListData)
      addDirectoryToList(newDirectory)
    } else {
      setSelectedFile(entry)
    }
  }

  return (
    <section className="panel-view">
      {directoryListData?.map((data, index) => (
        <Fragment key={index}>
          <DirectoryListViewer
            data={data}
            index={index}
            focused={focusedPaneIndex === index}
            onEntryCallback={(entry) => onEntryAction(index, entry)}
          />
          {index !== directoryListData.length - 1 && <ViewerDivider />}
        </Fragment>
      ))}
      {isViewFileModalOpen && <ViewFileModal viewData={directoryListData[focusedPaneIndex]} />}
    </section>
  )
}
export default PanelView
