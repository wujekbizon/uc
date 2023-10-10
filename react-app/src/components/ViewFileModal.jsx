import './ViewFileModal.scss'
import React, { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { log } from '../rectavalo/RectavaloWeb'

const ViewFileModal = ({ viewData }) => {
  const { selectedFile } = useSelector((state) => state.fileExplorers)
  const [contents, setContents] = useState('')
  const { closeViewFileModal } = useActions()
  const [size, setSize] = useState(0)

  useEffect(() => {
    // todo(@mribbons): buffering is working, but we should only read what is viewed + some lookahead
    viewData.getContents(selectedFile, 0).then((result) => {
      if (result.error) {
        setSize(0)
        setContents(result.error)
      } else {
        setSize(result.size)
        setContents(result.buffer)
      }
    })
  }, [selectedFile, viewData])

  useEffect(() => {
    if (size === 0 || contents.length === size)
      return;

    viewData.getContents(selectedFile, contents.length).then((result) => {
      setContents(contents + result.buffer)
    })
  }, [contents, size, viewData])

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
