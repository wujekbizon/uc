import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { actionCreators } from '../state/store'
import { useMemo } from 'react'

// Creating and exporting a custom hook called useActions
export const useActions = () => {
  // Accessing the dispatch function from the Redux store
  const dispatch = useDispatch()

  // Using useMemo to optimize performance of action creator bindings by creating
  // a new bound action object only when the dispatch function changes
  return useMemo(() => {
    // Binding all action creators to the dispatch function, creating a new object that
    // has the same keys as actionCreators but with every action creator
    // wrapped in a dispatch call so they may be invoked directly
    return bindActionCreators(actionCreators, dispatch)
  }, [dispatch])
}
