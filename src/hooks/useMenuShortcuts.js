import { useEffect } from 'react'
import { useActions } from './useActions'
import { menuOptions, coordinates } from '../data/commandBarLinks'

// custom hook called `useMenuShortcuts` that calls `handleKeyPress` for each menu option.
export const useMenuShortcuts = (handleKeyPress) => {
  const { openSubMenu } = useActions()
  useEffect(() => {
    const removeListeners = menuOptions.map(({ key, menu }) => {
      // each `handleKeyPress` call returns a function that removes the listener
      return handleKeyPress(key, ['alt'], (event) => {
        // get dynamic coordinates based on which key was pressed.
        const keyCoordinates = coordinates[key]
        openSubMenu({ page: menu, coordinates: keyCoordinates })
      })
    })
    return () => {
      removeListeners.forEach((removeListener) => removeListener())
    }
  }, [handleKeyPress])
}
