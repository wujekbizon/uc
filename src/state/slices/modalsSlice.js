import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSubMenuOpen: false,
  location: {
    center: 5,
    bottom: 30,
  },
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
  },
})

export const { openSubMenu, closeSubMenu } = modalsSlice.actions
export const modalsReducer = modalsSlice.reducer
