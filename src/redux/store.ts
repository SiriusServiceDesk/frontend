import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { applicationApi } from './services/application'
import { userApi } from './services/user'
import userReducer from './user/userSlice'

const rootReducer = combineReducers({
	[userApi.reducerPath]: userApi.reducer,
	[applicationApi.reducerPath]: applicationApi.reducer,
	userSlice: userReducer,
})

const apiMiddleware = [userApi.middleware, applicationApi.middleware]

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiMiddleware),
})

setupListeners(store.dispatch)
