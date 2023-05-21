import './CommandBar.scss'
import React, { useMemo, useEffect } from 'react'
import { links } from '../data/commandBarLinks'
import os from 'socket:os'

const CommandBar = () => {
  // memoize generic fn using the useMemo hook to prevent unnecessary re-renders.
  // we passing key and modifiers parameters and fn returns listener fn that is
  // executed when the key and modfiers match event that is fires.
  // we will have alot of keydown events so I think it will be nice to have such a fn.
  const memoizeHandleKeyPress = useMemo(
    () => (key, modifiers, callback) => {
      const listener = (event) => {
        // check what is the current os
        if (os.platform() === 'win32') {
          const hasModifiers = modifiers.every((modifier) => event[`${modifier.toLowerCase()}Key`])
          if (hasModifiers && event.key === key) {
            callback(event)
          }
        }
      }
      document.addEventListener('keydown', listener)
      return () => {
        document.removeEventListener('keydown', listener)
      }
    },
    []
  )
  // then inside useEffect add as many event listeners to document ,when coponent unmounts
  // useEffect returns a cleanup function, and remove the event listener to prevent memory leaks.
  // I'm sure there is room for improvement and we can refactor that later
  useEffect(() => {
    const altFListenerId = memoizeHandleKeyPress('f', ['alt'], (event) => {
      // here I add logic for open menu
      console.log('Files')
    })
    const altMListenerId = memoizeHandleKeyPress('m', ['alt'], (event) => {
      // here I add logic for open menu
      console.log('Mark')
    })
    const altCListenerId = memoizeHandleKeyPress('c', ['alt'], (event) => {
      // here I add logic for open menu
      console.log('Commands')
    })
    const altNListenerId = memoizeHandleKeyPress('n', ['alt'], (event) => {
      // here I add logic for open menu
      console.log('Net')
    })
    const altWListenerId = memoizeHandleKeyPress('w', ['alt'], (event) => {
      // here I add logic for open menu
      console.log('Show')
    })
    const altOListenerId = memoizeHandleKeyPress('o', ['alt'], (event) => {
      // here I add logic for open menu
      console.log('Configuration')
    })
    const altSListenerId = memoizeHandleKeyPress('s', ['alt'], (event) => {
      // here I add logic for open menu
      console.log('Start')
    })

    return () => {
      altFListenerId()
      altMListenerId()
      altCListenerId()
      altNListenerId()
      altWListenerId()
      altOListenerId()
      altSListenerId()
    }
  }, [memoizeHandleKeyPress])

  return (
    <section className="commandbar">
      <div className="commandbar_list-container">
        <ul className="commandbar_list">
          {links.map(({ link }, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
        <div>
          <h4>
            {/* here I want to have a button that will open new window and 
            show all the shortcuts, help ,credits etc or I can show modal 
            we can discuss that*/}
            <span>H</span>elp
          </h4>
        </div>
      </div>
      <div></div>
    </section>
  )
}
export default CommandBar
