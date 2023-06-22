import { useEffect } from 'react'
import { useActions } from './useActions'
import { menuOptions } from '../data/commandBarLinks'

// custom hook called `useMenuShortcuts` that calls `handleKeyPress` for each menu option.
export const useMenuShortcuts = (handleKeyPress) => {
  const { openSubMenu } = useActions()
  useEffect(() => {
    const removeListeners = menuOptions.map(({ key }, index) => {
      // each `handleKeyPress` call returns a function that removes the listener
      return handleKeyPress(key, ['alt'], () => {
        const elem = document.querySelector(`#menu-link${index}`)
        const page = elem.textContent.trim()
        const tempBtn = elem.getBoundingClientRect()
        const start = tempBtn.right - tempBtn.width
        const bottom = tempBtn.bottom
        const coordinates = { start, bottom }
        openSubMenu({ page, coordinates })
      })
    })
    return () => {
      removeListeners.forEach((removeListener) => removeListener())
    }
  }, [handleKeyPress, openSubMenu])
}
