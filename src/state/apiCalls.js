import { createAsyncThunk } from '@reduxjs/toolkit'
import DirectoryListData from '../api/DirectoryListData'

export const refreshPanes = createAsyncThunk('directoryList/refreshPanes', async (paneIndexes, thunkAPI) => {
  if (!Array.isArray(paneIndexes)) paneIndexes = [paneIndexes]
  const { directoryListData } = thunkAPI.getState().directoryList
  const newData = paneIndexes.reduce((acc, viewerIndex) => {
    acc[viewerIndex] = new DirectoryListData(directoryListData[viewerIndex]?.currentDirectory)
    return acc
  }, [])
  return newData
})
