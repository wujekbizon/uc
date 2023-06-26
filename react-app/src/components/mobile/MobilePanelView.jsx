import './MobilePanelView.scss'
import React, { useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from '../../hooks/useActions'
import { BsFillArrowDownSquareFill, BsFillArrowUpSquareFill } from 'react-icons/bs'
// Components
import { MobileDirectoryListViewer, MobileViewerDivider } from './index'
import ViewFileModal from '../ViewFileModal'

const MobilePanelView = () => {
  const { focusedPaneIndex, directoryViewCount } = useSelector((state) => state.fileExplorers)
  const { currentWorkingDirectory  } = useSelector((state) => state.platforms)
  const { directoryListData } = useSelector((state) => state.directoryListsData)
  const { isViewFileModalOpen } = useSelector((state) => state.modals)
  const { toggleFocus, fetchDirectoryList, getOppositePaneIndex, resetCursorPosition } = useActions()
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
    resetCursorPosition()
    const nextIndex = (focusedPaneIndex + 1) % directoryViewCount
    toggleFocus(nextIndex)
  }

  const handleClick = (event) => {
    console.log('tab press simulate')
    togglePanes(event)
  }

  return (
    <section className="mobile_panel-view">
      {directoryListData?.map((data, index) => (
        <Fragment key={index}>
          <MobileDirectoryListViewer data={data} paneIndex={index} />
          {index !== directoryListData.length - 1 && <MobileViewerDivider />}
          {focusedPaneIndex % 2 ? (
            <BsFillArrowUpSquareFill className="icon" onClick={handleClick} />
          ) : (
            <BsFillArrowDownSquareFill className="icon" onClick={handleClick} />
          )}
        </Fragment>
      ))}
      {isViewFileModalOpen && <ViewFileModal viewData={directoryListData[focusedPaneIndex]} />}
    </section>
  )
}
export default MobilePanelView
