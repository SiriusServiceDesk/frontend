import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const applicationApi = createApi({
	reducerPath: 'applicationApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.siriusdesk.ru/v1/',
		prepareHeaders: headers => {
			headers.set('authorization', `Bearer ${localStorage.getItem('token')}`)
			return headers
		},
	}),
	endpoints: builder => ({
		getAll: builder.query({
			query: () => ({
				url: 'applications/',
			}),
		}),
		getAllAdmin: builder.query({
			query: () => ({
				url: 'admin/applications/',
			}),
		}),

		getById: builder.query({
			query: id => ({
				url: `applications/${id}/`,
			}),
		}),
		getAnalytics: builder.query({
			query: () => ({
				url: `admin/applications/analytic/`,
			}),
		}),
		createRequest: builder.mutation({
			query: data => ({
				url: 'applications/',
				method: 'POST',
				body: data,
			}),
		}),
		updateRequest: builder.mutation({
			query: ([id, data]) => ({
				url: `applications/${id}`,
				method: 'PUT',
				body: data,
			}),
		}),
	}),
})

export const {
	useGetAllQuery,
	useGetAllAdminQuery,
	useGetByIdQuery,
	useGetAnalyticsQuery,
	useCreateRequestMutation,
	useUpdateRequestMutation,
} = applicationApi
