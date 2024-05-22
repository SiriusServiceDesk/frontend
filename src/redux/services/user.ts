import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.siriusdesk.ru/v1/',
		prepareHeaders: headers => {
			headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)

			return headers
		},
	}),
	endpoints: builder => ({
		login: builder.mutation({
			query: data => ({
				url: 'auth/login',
				method: 'POST',
				body: data,
			}),
			transformResponse: (response: any) => response.payload.token,
		}),
		registration: builder.mutation({
			query: data => ({
				url: 'auth/registration',
				method: 'POST',
				body: data,
			}),
		}),
		confirmEmail: builder.mutation({
			query: data => ({
				url: 'auth/confirmEmail',
				method: 'POST',
				body: data,
			}),
		}),
		resendCode: builder.mutation({
			query: data => ({
				url: 'auth/resendCode',
				method: 'POST',
				body: data,
			}),
		}),
		getUser: builder.query({
			query: () => ({
				url: `user/user`,
			}),
		}),
	}),
})

export const {
	useLoginMutation,
	useRegistrationMutation,
	useConfirmEmailMutation,
	useResendCodeMutation,
	useGetUserQuery,
} = userApi
