import { createApi } from '@reduxjs/toolkit/dist/query/react'

import {baseQuery, baseQueryFn} from './baseApi'

export const userTestService = createApi({
  reducerPath: 'userTestService',
  baseQuery: baseQueryFn(),
  tagTypes: ['testResults', 'userTest'],
  endpoints: build => ({
    sendTestResults: build.mutation({
      query: body => {
        return {
          url: `/usertest/`,
          method: `POST`,
          body: body,
        }
      },
      invalidatesTags: ['userTest'],
    }),
  }),
})

export const { useSendTestResultsMutation } = userTestService
