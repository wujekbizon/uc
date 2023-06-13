import { useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from './useActions'

export const useCursorHandlers = ({ paneIndex, entries, selectRef, debouncedScroll }) => {
  const { focusedPaneIndex } = useSelector((state) => state.fileExplorers)
  const { updateCursorPosition, updateScrollCursorPosition } = useActions()

  const memoizedHandlers = useMemo(() => {
    const handleArrows = (direction, event) => {
      if (focusedPaneIndex !== paneIndex) return
      event.preventDefault()
      updateCursorPosition({ direction, entries })
      debouncedScroll()
    }
    const keyDownHandler = (event) => {
      if (event.key === 'ArrowUp') {
        handleArrows('UP', event)
      } else if (event.key === 'ArrowDown') {
        handleArrows('DOWN', event)
      }
    }
    const mouseWheelHandler = (event) => {
      if (focusedPaneIndex !== paneIndex) return
      updateScrollCursorPosition({ cursorDelta: Math.sign(-1 * event.wheelDelta), entries })
      debouncedScroll()
    }
    return { keyDownHandler, mouseWheelHandler }
  }, [focusedPaneIndex, paneIndex, debouncedScroll, updateCursorPosition, updateScrollCursorPosition, entries])
  useEffect(() => {
    if (focusedPaneIndex === paneIndex) {
      window.addEventListener('keydown', memoizedHandlers.keyDownHandler)
      window.addEventListener('mousewheel', memoizedHandlers.mouseWheelHandler)
      selectRef?.current?.addEventListener('wheel', (event) => {
        event.preventDefault()
      })
    }
    return () => {
      window.removeEventListener('keydown', memoizedHandlers.keyDownHandler)
      window.removeEventListener('mousewheel', memoizedHandlers.mouseWheelHandler)
      selectRef?.current?.removeEventListener('wheel', (event) => {
        event.preventDefault()
      })
    }
  }, [memoizedHandlers, focusedPaneIndex, paneIndex, selectRef])
  return memoizedHandlers
}
