import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { modalsReducer, openSubMenu, closeSubMenu, openViewFileModal, closeViewFileModal } from './slices/modalsSlice'
import {
  mobilePlatformsReducer,
  enableMobileLayout,
  disableMobileLayout,
  loadAppSuccess,
  loadAppError,
} from './slices/mobilePlatformsSlice'

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    mobilePlatforms: mobilePlatformsReducer,
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
  enableMobileLayout,
  disableMobileLayout,
  loadAppSuccess,
  loadAppError,
}
