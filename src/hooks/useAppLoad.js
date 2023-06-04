import { useEffect } from 'react'
import { arch } from 'socket:os'
import { useActions } from './useActions'

export const useAppLoad = () => {
  const { loadAppError, loadAppSuccess } = useActions()
  const onAppLoad = () => {
    const timer = setTimeout(() => {
      loadAppSuccess()
    }, 3000)
    return timer
  }
  // // Rendering title
  useEffect(() => {
    document.title = `Ultimate Commander (${arch()}) 1.0 - PreBuild`
  }, [])

  useEffect(() => {
    let timer
    try {
      timer = onAppLoad()
    } catch (error) {
      loadAppError()
      console.log(error)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [])
}
