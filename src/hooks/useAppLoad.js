import { useEffect } from 'react'
import { arch } from '../stubs'

export const useAppLoad = (loadingTime = 3000, onLoadSuccess, onLoadError) => {
  // this hook takes three inputs: the duration of the loading
  // a callback fn that is invoked when the loading is successful
  // and a callback fn that is invoked when an error occurs.
  const onAppLoad = () => {
    const timer = setTimeout(() => {
      onLoadSuccess()
    }, loadingTime)
    return timer
  }
  // Rendering title
  // this is an extra use case to render the document title
  useEffect(() => {
    document.title = `Ultimate Commander (${arch()}) 1.0 - PreBuild`
  }, [])

  let timer
  useEffect(() => {
    try {
      timer = onAppLoad()
    } catch (error) {
      onLoadError()
      console.log(error)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [timer, onAppLoad])
}
