import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'

export const blocksService = createApi({
  reducerPath: 'blocksService',
  baseQuery: baseQuery(),
  tagTypes: ['block', 'createBlock'],
  endpoints: build => ({
    createBlock: build.mutation<any, { data: any; schoolName: string }>({
      query: (arg) => ({
        url: `/${arg.schoolName}/blocks/`,
        method: 'POST',
        body: arg.data,
      }),
      invalidatesTags: ['createBlock'],
    }),
  }),
})

export const { useCreateBlockMutation } = blocksService
