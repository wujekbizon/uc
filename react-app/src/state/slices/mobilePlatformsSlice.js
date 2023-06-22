import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isMobile: false,
  isLoading: true,
  isError: false,
}

const mobilePlatformsSlice = createSlice({
  name: 'mobile',
  initialState,
  reducers: {
    enableMobileLayout(state) {
      state.isMobile = true
    },
    disableMobileLayout(state) {
      state.isMobile = false
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

export const { enableMobileLayout, disableMobileLayout, loadAppSuccess, loadAppError } = mobilePlatformsSlice.actions
export const mobilePlatformsReducer = mobilePlatformsSlice.reducer
