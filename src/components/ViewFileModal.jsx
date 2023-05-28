import './ViewFileModal.scss'
import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { useActions } from '../hooks/useActions'

const ViewFileModal = ({ selectedFile }) => {
  const { closeViewFileModal } = useActions()

  const onClickHandle = () => {
    closeViewFileModal()
  }
  return (
    <aside className="view-file_modal">
      <header className="view-file_header">
        <div className="view-file_title">
          <h4>
            <span>Viewer</span> - c:\..\..\{selectedFile.name}
          </h4>
          <MdOutlineClose className="view-file_icon" onClick={onClickHandle} />
        </div>
        <nav className="view-file_nav">
          <ul className="view-file_menu">
            <li>File</li>
            <li>Edit</li>
            <li>Options</li>
            <li>Plugins</li>
            <li>Encoding</li>
            <li>Help</li>
          </ul>
          <h4>100%</h4>
        </nav>
      </header>
      <main className="view-file_main">
        <h3>Full path..\{selectedFile.name}</h3>
        <h3>Total space occupied: {selectedFile.size} bytes</h3>
      </main>
    </aside>
  )
}
export default ViewFileModal
