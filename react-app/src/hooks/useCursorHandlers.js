import { useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useActions } from './useActions'
import Path from '../rectavalo/Path'

import { traverseDirectory } from '../helpers/fileSystem'

export const useCursorHandlers = ({ data, paneIndex, entries, selectRef, debouncedScroll }) => {
  const { focusedPaneIndex, cursorOver } = useSelector((state) => state.fileExplorers)
  const { directoryListData } = useSelector((state) => state.directoryListsData)
  const { setSelectedFile, updateCursorPosition, updateScrollCursorPosition, addDirectoryToList } = useActions()

  const memoizedHandlers = useMemo(() => {
    const handleArrows = (direction, event) => {
      if (focusedPaneIndex !== paneIndex) return
      event.preventDefault()
      updateCursorPosition({ direction, entries })
      debouncedScroll()
    }
    const traverse = (event, entry, selectNext) => {
      if (focusedPaneIndex !== paneIndex) return
      event.preventDefault()
      const listData = traverseDirectory(focusedPaneIndex, entry, directoryListData)
      listData[focusedPaneIndex].nextBasename = selectNext
      addDirectoryToList(listData)
    }
    const handleEnter = (event) => {
      // if focused entry is .. then we want to pass current folder's basename as next selection
      // otherwise just pass .. because traversing into a folder should result in the cursor being at 0
      const selectNext = entries[cursorOver[focusedPaneIndex]] === '..' ? 
      Path.basename(directoryListData[focusedPaneIndex].currentDirectory) : 
        '..'

      traverse(event, entries[cursorOver[focusedPaneIndex]], selectNext)
    }
    const handleBackspace = (event) => {
      const selectNext = Path.basename(directoryListData[focusedPaneIndex].currentDirectory)
      traverse(event, '..', selectNext)
    }
    const keyDownHandler = (event) => {
      if (event.key === 'ArrowUp') {
        handleArrows('UP', event)
      } else if (event.key === 'ArrowDown') {
        handleArrows('DOWN', event)
      } else if (event.key === 'Enter') {
        handleEnter(event)
      } else if (event.key === 'Backspace') {
        handleBackspace(event)
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
    let ref = selectRef.current

    if (focusedPaneIndex === paneIndex) {
      window.addEventListener('keydown', memoizedHandlers.keyDownHandler)
      window.addEventListener('mousewheel', memoizedHandlers.mouseWheelHandler)
      ref?.addEventListener('wheel', (event) => {
        event.preventDefault()
      })
    }
    return () => {
      window.removeEventListener('keydown', memoizedHandlers.keyDownHandler)
      window.removeEventListener('mousewheel', memoizedHandlers.mouseWheelHandler)
      ref.removeEventListener('wheel', (event) => {
        event.preventDefault()
      })
    }
  }, [memoizedHandlers, focusedPaneIndex, setSelectedFile, paneIndex, selectRef, addDirectoryToList, directoryListData])
  return memoizedHandlers
}
