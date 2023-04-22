import { configureStore } from '@reduxjs/toolkit'
import darkmodeReducer from './slices/darkmode'
import messageReducer from './slices/message'
import authReducer from './slices/auth'
import userReducer from './slices/user';

export default configureStore({
    reducer: {
        darkmode: darkmodeReducer,
        message: messageReducer,
        auth: authReducer,
        user: userReducer
    },
    devTools: true,
  })
  