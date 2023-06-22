import { useMemo } from 'react'
import {os} from './stubs'

// memoize generic fn using the useMemo hook to prevent unnecessary re-renders.
// we passing key and modifiers parameters and fn returns listener fn that is
// executed when the key and modfiers match event that is fires.
// we will have alot of keydown events so I think it will be nice to have such a fn.
const memoizeHandleKeyPress = () => {
  return useMemo(
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
      window.addEventListener('keydown', listener)
      return () => {
        window.removeEventListener('keydown', listener)
      }
    },
    []
  )
}

export default memoizeHandleKeyPress
