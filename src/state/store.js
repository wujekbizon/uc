import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  modalsReducer,
  openSubMenu,
  closeSubMenu,
  openViewFileModal,
  closeViewFileModal,
  openSettingsModal,
  closeSettingsModal,
} from './slices/modalsSlice'
import {
  mobilePlatformsReducer,
  enableMobileLayout,
  disableMobileLayout,
  loadAppSuccess,
  loadAppError,
} from './slices/mobilePlatformsSlice'
import {
  fileExplorerReducer,
  toggleFocus,
  setSelectedFile,
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
    mobilePlatforms: mobilePlatformsReducer,
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
  openViewFileModal,
  closeViewFileModal,
  openSettingsModal,
  closeSettingsModal,
  enableMobileLayout,
  disableMobileLayout,
  loadAppSuccess,
  loadAppError,
  toggleFocus,
  setSelectedFile,
  setFocus,
  addDirectoryToList,
  fetchDirectoryList,
  setEntries,
  updateCursorPosition,
  updateScrollCursorPosition,
  getOppositePaneIndex,
  resetCursorPosition,
}
