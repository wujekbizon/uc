import { useEffect, useMemo } from 'react'
export const useKeyboardEvents = (keyHandlers = {}, dependencies = []) => {
  const memoizedHandleKeyDown = useMemo(() => {
    return (event) => {
      // If a specific key handler is defined for the key pressed,
      // call that handler.
      if (keyHandlers[event.key]) {
        event.preventDefault()
        keyHandlers[event.key](event)
        return false
      }
    }
  }, dependencies)
  useEffect(() => {
    // Add the keydown event listener to the window
    window.addEventListener('keydown', memoizedHandleKeyDown)
    // Remove the event listener on component cleanup
    return () => {
      window.removeEventListener('keydown', memoizedHandleKeyDown)
    }
  }, [memoizedHandleKeyDown])
}
