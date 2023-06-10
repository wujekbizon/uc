import { createSlice } from '@reduxjs/toolkit'
import DirectoryListData from '../../api/DirectoryListData'
import { refreshPanes } from '../apiCalls'

const initialState = {
  directoryListData: [],
}

const directoryListSlice = createSlice({
  name: 'directoryList',
  initialState,
  reducers: {
    fetchDirectoryList: (state, { payload }) => {
      state.directoryListData = Array.from({ length: payload }, () => new DirectoryListData())
    },
    addDirectoryToList: (state, { payload }) => {
      state.directoryListData = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshPanes.fulfilled, (state, { payload }) => {
      state.directoryListData = payload
    })
  },
})
export const { fetchDirectoryList, addDirectoryToList } = directoryListSlice.actions
export const directoryListReducer = directoryListSlice.reducer
