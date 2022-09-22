import {createApi} from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'


export const UserCountByMonthServices = createApi({
  reducerPath: 'UserCountByMonthServices',
  baseQuery,
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

export const { useFetchUserCountByMonthDataQuery } = UserCountByMonthServices
