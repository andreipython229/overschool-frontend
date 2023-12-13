import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'

export const userTestService = createApi({
  reducerPath: 'userTestService',
  baseQuery: baseQuery(),
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
