import './SearchBar.scss'
import React from 'react'

const SearchBar = () => {
  return (
    <div className="search">
      <label htmlFor="search">c:\</label>
      <input id="search" type="text" />
    </div>
  )
}
export default SearchBar
