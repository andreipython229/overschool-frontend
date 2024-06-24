import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { baseQueryWithReauth } from './baseQueryReauth'

export const userTestService = createApi({
  reducerPath: 'userTestService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['testResults', 'userTest'],
  endpoints: build => ({
    sendTestResults: build.mutation<any, {body: any, schoolName: string}>({
      query: ({ body, schoolName }) => {
        return {
          url: `${schoolName}/usertest/`,
          method: `POST`,
          body: body,
        }
      },
      invalidatesTags: ['userTest'],
    }),
  }),
})

export const { useSendTestResultsMutation } = userTestService
