import { createSlice } from '@reduxjs/toolkit'
import { subMenu } from '../../data/comandBarSubMenuLinks'

const initialState = {
  isSubMenuOpen: false,
  location: {
    start: 5,
    bottom: 30,
  },
  page: subMenu[0],
  isViewFileModalOpen: false,
}

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSubMenu(state, { payload }) {
      const newPage = subMenu.find((link) => link.page === payload.page)
      if (newPage !== undefined) {
        state.page = newPage
        state.location = payload.coordinates
      }
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
