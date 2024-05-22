import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	name: null,
	surname: null,
	email: null,
	password: null,
	role: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.name = action.payload.name
			state.surname = action.payload.surname
			state.email = action.payload.email
			state.password = action.payload.password
			state.role = action.payload.role
		},
		removeUser() {
			localStorage.removeItem('token')
			return { ...initialState }
		},
	},
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
