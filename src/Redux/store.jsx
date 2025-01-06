import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import logoutReducer from './auth/logoutSlice';
import addEmployeReducer from './Employe/addEmployeSlice'
import getEmployeeReducer from './Employe/getEmployeSlice'

export const store = configureStore({
  reducer: {
    appAuth:authReducer,
    logout:logoutReducer,
    employee:addEmployeReducer,
    getEmployees:getEmployeeReducer

  },
})