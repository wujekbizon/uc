import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  modalsReducer,
  openSubMenu,
  closeSubMenu,
  closeActiveModal,
  openViewFileModal,
  closeViewFileModal,
  openSettingsModal,
  closeSettingsModal,
} from './slices/modalsSlice'
import {
  platformsReducer,
  loadAppSuccess,
  loadAppError,
  setCurrentWorkingDirectory,
  setCurrentPlatform,
} from './slices/platformsSlice'
import {
  fileExplorerReducer,
  toggleFocus,
  setSelectedFile,
  setCursorPosition,
  setFocus,
  setEntries,
  updateCursorPosition,
  updateScrollCursorPosition,
  getOppositePaneIndex,
  resetCursorPosition,
} from './slices/fileExplorer'
import { directoryListReducer, addDirectoryToList, fetchDirectoryList } from './slices/directoryList'

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    platforms: platformsReducer,
    fileExplorers: fileExplorerReducer,
    directoryListsData: directoryListReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const actionCreators = {
  openSubMenu,
  closeSubMenu,
  closeActiveModal,
  openViewFileModal,
  closeViewFileModal,
  openSettingsModal,
  closeSettingsModal,
  loadAppSuccess,
  loadAppError,
  toggleFocus,
  setSelectedFile,
  setCursorPosition,
  setFocus,
  addDirectoryToList,
  fetchDirectoryList,
  setEntries,
  updateCursorPosition,
  updateScrollCursorPosition,
  getOppositePaneIndex,
  resetCursorPosition,
  setCurrentWorkingDirectory,
  setCurrentPlatform,
}
