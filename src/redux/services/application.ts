import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const applicationApi = createApi({
	reducerPath: 'applicationApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.urcop.ru/v1/applications/',
		prepareHeaders: headers => {
			headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
			return headers
		},
	}),
	endpoints: builder => ({
		getAll: builder.query({
			query: () => ({
				url: '',
			}),
		}),
		getById: builder.query({
			query: id => ({
				url: `/${id}`,
			}),
		}),
		createRequest: builder.mutation({
			query: data => ({
				url: '',
				method: 'POST',
				body: data,
			}),
		}),
		updateStatusApplication: builder.mutation({
			query: data => ({
				url: '',
				method: 'PATCH',
				body: data,
			}),
		}),
	}),
})

export const {
	useGetAllQuery,
	useGetByIdQuery,
	useCreateRequestMutation,
	useUpdateStatusApplicationMutation,
} = applicationApi
