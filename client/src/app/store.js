import { configureStore } from '@reduxjs/toolkit'
import darkmodeReducer from './slices/darkmode'
import messageReducer from './slices/message'
import authReducer from './slices/auth'

export default configureStore({
    reducer: {
        darkmode: darkmodeReducer,
        message: messageReducer,
        auth: authReducer
    },
    devTools: true,
  })
  