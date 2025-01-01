import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import logoutReducer from './auth/logoutSlice';

export const store = configureStore({
  reducer: {
    appAuth:authReducer,
    logout:logoutReducer

  },
})