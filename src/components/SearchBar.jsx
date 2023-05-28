import './SearchBar.scss'
import React, { useState } from 'react'

const SearchBar = () => {
  const [searchFile, setSearchFile] = useState('')

  const onHandleChange = (event) => {
    setSearchFile(event.target.value)
  }

  return (
    <div className="search">
      <label htmlFor="search">c:\</label>
      <input value={searchFile} id="search" type="text" onChange={onHandleChange} />
    </div>
  )
}
export default SearchBar
