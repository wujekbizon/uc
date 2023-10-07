import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  focusedPaneIndex: 0,
  oppositePaneIndex: 1,
  selectedFile: null,
  isSelected: false,
  isFocused: [true, false],
  directoryViewCount: 2,
  cursorOver: [0, 0],
  entries: ['[..]'],
}

const fileExplorerSlice = createSlice({
  name: 'fileExplorer',
  initialState,
  reducers: {
    setEntries: (state, { payload }) => {
      state.entries = payload
    },
    // toggle focus
    toggleFocus: (state, { payload }) => {
      // set all panes to not be focused
      state.isFocused.fill(false)
      // set the selected pane to be focused
      state.isFocused[payload] = true
      // set the focused pane index
      state.focusedPaneIndex = payload
    },
    setFocus: (state, { payload }) => {
      state.focusedPaneIndex = payload
    },
    getOppositePaneIndex: (state) => {
      state.oppositePaneIndex = (state.focusedPaneIndex + 1) % state.directoryViewCount
    },
    // set selected file
    setSelectedFile: (state, { payload }) => {
      const { entry, entryIndex } = payload
      state.isSelected = true
      state.cursorOver[state.focusedPaneIndex] = entryIndex
      state.selectedFile = { entry }
    },
    updateCursorPosition: (state, { payload }) => {
      if (payload.direction === 'UP') {
        state.cursorOver[state.focusedPaneIndex] = Math.max(state.cursorOver[state.focusedPaneIndex] - 1, 0)
      }
      if (payload.direction === 'DOWN') {
        state.cursorOver[state.focusedPaneIndex] = Math.min(state.cursorOver[state.focusedPaneIndex] + 1, payload.entries.length - 1)
      }
    },
    updateScrollCursorPosition: (state, { payload }) => {
      state.cursorOver = Math.max(Math.min(state.cursorOver[state.focusedPaneIndex] + payload.cursorDelta, payload.entries.length - 1), 0)
    },
    resetCursorPosition: (state) => {
      state.cursorOver = [0, 0]
    },
  },
})

export const {
  toggleFocus,
  setSelectedFile,
  setFocus,
  setEntries,
  updateCursorPosition,
  updateScrollCursorPosition,
  getOppositePaneIndex,
  resetCursorPosition,
} = fileExplorerSlice.actions
export const fileExplorerReducer = fileExplorerSlice.reducer
