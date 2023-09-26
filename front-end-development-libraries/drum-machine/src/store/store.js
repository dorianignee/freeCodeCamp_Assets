import { configureStore } from '@reduxjs/toolkit'
import displayReducer from './displaySlice'

export default configureStore({
    reducer: {
        display: displayReducer
    }
})