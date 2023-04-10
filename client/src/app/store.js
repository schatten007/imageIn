import { configureStore } from '@reduxjs/toolkit'
import darkmodeReducer from './slices/darkmodeSlice'

export default configureStore({
    reducer: {
        darkmode: darkmodeReducer
    },
  })
  