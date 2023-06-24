import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPlatform: null,
  isMobilePlatform: false,
  isDesktopPlatform: false,
  isLoading: true,
  isError: false,
}

const platformsSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    setCurrentPlatform(state, { payload }) {
      if (payload === 'darwin' || payload === 'win32' || payload === 'linux') {
        state.isDesktopPlatform = true
        state.currentPlatform = payload
      }
      if (payload === 'ios' || payload === 'android') {
        state.isMobilePlatform = true
        state.currentPlatform = payload
      }
    },
    loadAppSuccess(state) {
      state.isLoading = false
    },
    loadAppError(state) {
      state.isLoading = false
      state.isError = true
    },
  },
})

export const { loadAppSuccess, loadAppError, setCurrentPlatform } = platformsSlice.actions
export const platformsReducer = platformsSlice.reducer
