import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSubMenuOpen: false,
  location: {
    center: 5,
    bottom: 30,
  },
  isViewFileModalOpen: false,
}

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSubMenu(state) {
      state.isSubMenuOpen = true
    },
    closeSubMenu(state) {
      state.isSubMenuOpen = false
    },
    openViewFileModal(state) {
      state.isViewFileModalOpen = true
    },
    closeViewFileModal(state) {
      state.isViewFileModalOpen = false
    },
  },
})

export const { openSubMenu, closeSubMenu, openViewFileModal, closeViewFileModal } = modalsSlice.actions
export const modalsReducer = modalsSlice.reducer
