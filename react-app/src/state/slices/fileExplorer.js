import { createSlice } from '@reduxjs/toolkit'
import { log } from '../../rectavalo/RectavaloWeb'

const initialState = {
  focusedPaneIndex: 0,
  oppositePaneIndex: 1,
  selectedFile: null,
  isSelected: false,
  isFocused: [true, false],
  directoryViewCount: 2,
  cursorOver: [0, 0],  
  lastSelectedEntry: [null, null],
  entries: ['[..]'],
}

/**
 * calling actions from other actions doesn't seem to work, make this a separate function that can be called as by both setSelectedFile and setCursorPosition
 * @param {*} state 
 * @param {*} param1 
 */
const _setSelectedFile = (state, { payload }) => {
  const { entry, entryIndex } = payload
  state.isSelected = true
  state.cursorOver[state.focusedPaneIndex] = entryIndex
  state.lastSelectedEntry[state.focusedPaneIndex] = 
    state.selectedFile = 
    entry
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
      state.selectedFile = state.lastSelectedEntry[state.focusedPaneIndex] ?? state.selectedFile
    },
    setFocus: (state, { payload }) => {
      state.focusedPaneIndex = payload
    },
    getOppositePaneIndex: (state) => {
      state.oppositePaneIndex = (state.focusedPaneIndex + 1) % state.directoryViewCount
    },
    // set selected file
    setSelectedFile: (state, { payload }) => {
      _setSelectedFile(state, {payload})
    },
    setCursorPosition: (state, { payload }) => {
      const { entryIndex, paneIndex } = payload
      if (paneIndex === state.focusedPaneIndex) {
        _setSelectedFile(state, { payload: {entryIndex, entry: payload.entries[entryIndex] }})
      } else {
        state.cursorOver[paneIndex] = entryIndex
      }
    },
    updateCursorPosition: (state, { payload }) => {
      if (payload.direction === 'UP') {
        state.cursorOver[state.focusedPaneIndex] = Math.max(state.cursorOver[state.focusedPaneIndex] - 1, 0)
      }
      if (payload.direction === 'DOWN') {
        state.cursorOver[state.focusedPaneIndex] = Math.min(state.cursorOver[state.focusedPaneIndex] + 1, payload.entries.length - 1)
      }
      state.lastSelectedEntry[state.focusedPaneIndex] = 
        state.selectedFile = 
        payload.entries[state.cursorOver[state.focusedPaneIndex]]

    },
    updateScrollCursorPosition: (state, { payload }) => {
      state.cursorOver[state.focusedPaneIndex] = Math.max(Math.min(state.cursorOver[state.focusedPaneIndex] + payload.cursorDelta, payload.entries.length - 1), 0)
    },
    resetCursorPosition: (state) => {
      state.cursorOver = [0, 0]
    },
  },
})

export const {
  toggleFocus,
  setSelectedFile,
  setCursorPosition,
  setFocus,
  setEntries,
  updateCursorPosition,
  updateScrollCursorPosition,
  getOppositePaneIndex,
  resetCursorPosition,
} = fileExplorerSlice.actions
export const fileExplorerReducer = fileExplorerSlice.reducer
