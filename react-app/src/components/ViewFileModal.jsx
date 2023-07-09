import './ViewFileModal.scss'
import React, { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'

const ViewFileModal = ({ viewData }) => {
  const { selectedFile } = useSelector((state) => state.fileExplorers)
  const [contents, setContents] = useState('')
  const { closeViewFileModal } = useActions()

  useEffect(() => {
    /* todo - This is slow on large files. Buffer data. 
    Need to determine max width and height so scrollbars can be set properly without displaying entire file
    */
    viewData.getContents(selectedFile).then((buffer) => {
      setContents(buffer.toString())
    })
  }, [selectedFile, viewData])

  const onClickHandle = () => {
    closeViewFileModal()
  }
  return (
    <aside className="view-file_modal">
      <header className="view-file_header">
        <div className="view-file_title">
          <h4>
            <span>Viewer</span> - {viewData.fullPath(selectedFile)}
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
        <pre>{contents}</pre>
      </main>
    </aside>
  )
}
export default ViewFileModal
