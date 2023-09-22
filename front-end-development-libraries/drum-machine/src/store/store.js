import { configureStore } from '@reduxjs/toolkit'
import displayReducer from './displaySlice'
import drumReducer from './drumSlice'

export default configureStore({
    reducer: {
        display: displayReducer,
        drums: drumReducer
    }
})