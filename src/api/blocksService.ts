import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { IBlockCode, IBlockDesc, IBlockPic, IBlockVid } from 'types/sectionT'

export const blocksService = createApi({
  reducerPath: 'blocksService',
  baseQuery: baseQuery(),
  tagTypes: ['block', 'createBlock', 'deleteBlock', 'updateBlock'],
  endpoints: build => ({
    createBlock: build.mutation<any, { data: any; schoolName: string }>({
      query: arg => ({
        url: `/${arg.schoolName}/blocks/`,
        method: 'POST',
        body: arg.data,
      }),
      invalidatesTags: ['createBlock'],
    }),
    deleteBlock: build.mutation<any, { id: string | number; schoolName: string }>({
      query: arg => ({
        url: `/${arg.schoolName}/blocks/${arg.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['deleteBlock'],
    }),
    updateBlockData: build.mutation<any, { data: IBlockCode | IBlockDesc | IBlockVid | IBlockPic; schoolName: string }>({
      query: arg => ({
        url: `/${arg.schoolName}/blocks/${arg.data.id}/`,
        method: 'PATCH',
        body: arg.data,
      }),
      invalidatesTags: ['updateBlock'],
    }),
  }),
})

export const { useCreateBlockMutation, useDeleteBlockMutation, useUpdateBlockDataMutation } = blocksService
