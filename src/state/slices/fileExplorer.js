import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  focusedPaneIndex: 0,
  selectedFile: null,
  isFocused: [true, false],
  directoryViewCount: 2,
}

const fileExplorerSlice = createSlice({
  name: 'fileExplorer',
  initialState,
  reducers: {
    // toggle focus
    toggleFocus: (state, { payload }) => {
      state.isFocused[payload] = true
      state.isFocused[1 - payload] = false
      state.focusedPaneIndex = payload
    },
    setFocus: (state, { payload }) => {
      state.focusedPaneIndex = payload
    },
    // set selected file
    setSelectedFile: (state, { payload }) => {
      state.selectedFile = payload
    },
  },
})

export const { toggleFocus, setSelectedFile, setFocus } = fileExplorerSlice.actions
export const fileExplorerReducer = fileExplorerSlice.reducer
