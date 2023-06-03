import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { modalsReducer, openSubMenu, closeSubMenu, openViewFileModal, closeViewFileModal } from './slices/modalsSlice'

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
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
}
