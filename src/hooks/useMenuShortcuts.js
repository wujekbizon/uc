import { useEffect } from 'react'
import { useActions } from './useActions'
import { menuOptions } from '../data/commandBarLinks'

// custom hook called `useMenuShortcuts` that calls `handleKeyPress` for each menu option.
export const useMenuShortcuts = (handleKeyPress) => {
  const { openSubMenu } = useActions()
  useEffect(() => {
    const removeListeners = menuOptions.map(({ key, menu }) => {
      // each `handleKeyPress` call returns a function that removes the listener
      return handleKeyPress(key, ['alt'], (event) => {
        openSubMenu()
        console.log(menu)
      })
    })
    return () => {
      removeListeners.forEach((removeListener) => removeListener())
    }
  }, [handleKeyPress])
}
