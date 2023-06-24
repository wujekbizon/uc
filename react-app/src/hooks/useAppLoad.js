import { useEffect, useCallback } from 'react'
import sys from '../rectavalo/sys'

// import sys from './rectavalo/sys'

export const useAppLoad = (loadingTime = 3000, onLoadSuccess, onLoadError) => {
  // this hook takes three inputs: the duration of the loading
  // a callback fn that is invoked when the loading is successful
  // and a callback fn that is invoked when an error occurs.
  const onAppLoad = useCallback(() => {
    // Using `useCallback` memoizes the function, which means that the same function instance is
    // used across renders, as long as the dependencies (`loadingTime` and `onLoadSuccess`) don't change.
    const timer = setTimeout(() => {
      onLoadSuccess()
    }, loadingTime)
    return timer
  }, [loadingTime, onLoadSuccess])
  // Rendering title
  // this is an extra use case to render the document title
  useEffect(() => {
    document.title = `Ultimate Commander (${sys.architecture()}) 1.0 - PreBuild`
  }, [])

  useEffect(() => {
    let timer
    try {
      timer = onAppLoad()
    } catch (error) {
      onLoadError()
      console.log(error)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [onAppLoad, onLoadError])
}
