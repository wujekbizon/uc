import './FileViewer.scss'
import React, { useEffect, useState } from 'react'
import { FcFolder, FcFile } from 'react-icons/fc'
import { ImArrowUp } from 'react-icons/im'

// Components
import { FileViewerBar } from './index'
import FileViewerData from '../api/FileViewerData'
import { FileViewerEntry } from './FileViewerEntry'

// todo: This should be called DirectoryListViewer
/**
 * 
 * @param {FileViewerData} data 
 * @returns 
 */
const FileViewer = (props) => {

  const [entries, setEntries] = useState([]);
  entries.push('[..]')
  let items = []

  useEffect(() => {
    props.data.refresh().then(() => {
      entries.push(...props.data._entries)
      setEntries(['..', ...entries])
    })
  }, [])

  items = entries.map((entry, k) => (<FileViewerEntry key={k} entry={entry} />))

  return (
    <section className="file-viewer">
      <FileViewerBar />
      <div className="files-container">
        {items}
      </div>
    </section>
  )
}
export default FileViewer
