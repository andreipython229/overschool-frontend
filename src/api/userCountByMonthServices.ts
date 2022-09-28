import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'

export const userCountByMonthServices = createApi({
  reducerPath: 'UserCountByMonthServices',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['userCountByMonth'],
  endpoints: build => ({
    fetchUserCountByMonthData: build.query<any, void>({
      query: () => ({
        url: `/user_count_by_month_group/`,
      }),
      providesTags: () => ['userCountByMonth'],
    }),
  }),
})

export const { useFetchUserCountByMonthDataQuery } = userCountByMonthServices
