import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentWorkingDirectory: null,
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
    setCurrentWorkingDirectory(state, { payload }) {
      state.currentWorkingDirectory = payload
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

export const { loadAppSuccess, loadAppError, setCurrentWorkingDirectory, setCurrentPlatform } = platformsSlice.actions
export const platformsReducer = platformsSlice.reducer
