import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './services/user'
import userReducer from './user/userSlice'

const rootReducer = combineReducers({
	[userApi.reducerPath]: userApi.reducer,
	userSlice: userReducer,
})

const apiMiddleware = [userApi.middleware]

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiMiddleware),
})

setupListeners(store.dispatch)
