import './Taskbar.scss'
import React from 'react'

// Components
import SearchBar from './SearchBar'

const Taskbar = () => {
  return (
    <footer className="taskbar">
      <SearchBar />
      <div className="btns-taskbar">
        <button>
          <span>F3</span>View
        </button>
        <button>
          <span>F4</span>Edit
        </button>
        <button>
          <span>F5</span> Copy
        </button>
        <button>
          <span>F6</span> Move
        </button>
        <button>
          <span>F7</span> NewFolder
        </button>
        <button>
          <span>F8</span> Delete
        </button>
        <button>
          <span>Alt + F4</span>
          Exit
        </button>
      </div>
    </footer>
  )
}
export default Taskbar
