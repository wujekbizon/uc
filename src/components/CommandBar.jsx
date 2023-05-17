import './CommandBar.scss'
import React from 'react'

const CommandBar = () => {
  return (
    <section className="commandbar">
      <div className="commandbar_list-container">
        <ul className="commandbar_list">
          <li>
            <span>F</span>iles
          </li>
          <li>
            <span>M</span>ark
          </li>
          <li>
            <span>C</span>ommands
          </li>
          <li>
            <span>N</span>et
          </li>
          <li>
            Sho<span>w</span>
          </li>
          <li>
            C<span>o</span>nfiguration
          </li>
          <li>
            <span>S</span>tart
          </li>
        </ul>
        <div>
          <h4>
            <span>H</span>elp
          </h4>
        </div>
      </div>
      <div></div>
    </section>
  )
}
export default CommandBar
