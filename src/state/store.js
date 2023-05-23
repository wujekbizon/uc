import { configureStore } from '@reduxjs/toolkit'
import { modalsReducer, openSubMenu, closeSubMenu } from './slices/modalsSlice'

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
  },
})

export const actionCreators = {
  openSubMenu,
  closeSubMenu,
}
