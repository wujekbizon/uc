import './PanelView.scss'
import React, { useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { refreshPanes } from '../state/apiCalls'
// Components
import { ViewerDivider, DirectoryListViewer, ViewFileModal } from './index'
import { useKeyboardEvents } from '../hooks/useKeyboardEvents'
import { FILE_SORT_MODE_DATE, SORT_DESCENDING } from '../api/DirectoryListData'

const PanelView = () => {
  const { focusedPaneIndex, selectedFile, directoryViewCount, oppositePaneIndex } = useSelector(
    (state) => state.fileExplorers
  )
  const { currentWorkingDirectory  } = useSelector((state) => state.platforms)
  const { directoryListData } = useSelector((state) => state.directoryListsData)
  const { isViewFileModalOpen } = useSelector((state) => state.modals)
  const { openViewFileModal, toggleFocus, fetchDirectoryList, getOppositePaneIndex, resetCursorPosition } = useActions()

  // effects
  useEffect(() => {
    // fetching a list of data
    // todo - This will need to load previous cwd from history for each pane
    fetchDirectoryList({ directoryViewCount, currentWorkingDirectory })
  }, [directoryViewCount, fetchDirectoryList, currentWorkingDirectory])

  useEffect(() => {
    // we need to run this by Redux to avoid any strange behaviors
    // so everytime we change panes we will get opposite index and update
    // the state
    getOppositePaneIndex()
  }, [focusedPaneIndex, getOppositePaneIndex])

  const togglePanes = (event) => {
    event.preventDefault()
    const nextIndex = (focusedPaneIndex + 1) % directoryViewCount
    toggleFocus(nextIndex)
  }

  const copyFile = async (event) => {
    if (selectedFile === '..') return
    // todo - copy file dialog, check if dest exists add (1) suffix
    // todo - chunked copy with progress dialog
    if (
      await directoryListData[focusedPaneIndex].copyFile(
        selectedFile,
        directoryListData[oppositePaneIndex].currentDirectory
      )
    ) {
      refreshPanes(oppositePaneIndex)
    }
  }

  const unhandledKey = (event) => {
    console.log(`key not yet implemented: ${event.key}`)
  }

  const moveFile = async (event) => {
    if (selectedFile === '..') return
    // todo - same dialog as copy file
    // todo - refresh source, dest panes
    if (
      await directoryListData[focusedPaneIndex].moveFile(
        selectedFile,
        directoryListData[oppositePaneIndex].currentDirectory
      )
    ) {
      // refreshPanes(allPanes)
      //  I think we can use this instead
      fetchDirectoryList({ directoryViewCount, currentWorkingDirectory })
    }
  }

  const newFolder = async (event) => {
    // todo - folder name dialog, takes current entry as starting point for new folder name, all text selected for easy overwrite
    // todo - refresh current pane
    if (await directoryListData[focusedPaneIndex].newFolder('new\\path')) {
      refreshPanes(focusedPaneIndex)
    }
  }

  const deleteFile = async (event) => {
    if (selectedFile === '..') return
    // todo - Are you sure dialog
    // todo - delete to recycle/trash bin if shift not pressed
    // todo - refresh current pane
    if (await directoryListData[focusedPaneIndex].deleteFile(selectedFile)) {
      refreshPanes(focusedPaneIndex)
    }
  }

  const keyHandlers = {
    Tab: togglePanes,
    F3: openViewFileModal,
    F4: unhandledKey,
    F5: copyFile,
    F6: moveFile,
    F7: newFolder,
    F8: deleteFile,
  }
  // passing fn names into dependencies array inside useMemo,
  // we can think later about moving all of this fn calls into redux
  useKeyboardEvents(keyHandlers, [togglePanes, unhandledKey, copyFile, moveFile, newFolder, deleteFile])

  return (
    <section className="panel-view">
      {directoryListData?.map((data, index) => {
        return (
          <Fragment key={index}>
            <DirectoryListViewer data={data} paneIndex={index} sortMode={FILE_SORT_MODE_DATE} sortOrder={SORT_DESCENDING} />
            {index !== directoryListData.length - 1 && <ViewerDivider />}
          </Fragment>
        )
      })}
      {isViewFileModalOpen && <ViewFileModal viewData={directoryListData[focusedPaneIndex]} />}
    </section>
  )
}
export default PanelView
