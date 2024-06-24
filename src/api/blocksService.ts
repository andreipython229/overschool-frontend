import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { BlockButtonT, IBlockCode, IBlockDesc, IBlockPic, IBlockVid, IButton } from 'types/sectionT'
import { baseQueryWithReauth } from './reauthBaseQuery'

type OrderT = {
  block_id: number | string
  order: number | string
}

export const blocksService = createApi({
  reducerPath: 'blocksService',
  baseQuery: baseQueryWithReauth,
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
    orderUpdate: build.mutation<void, { data: OrderT[]; schoolName: string }>({
      query: arg => ({
        url: `/${arg.schoolName}/block_order/`,
        method: 'POST',
        body: arg.data,
      }),
    }),
    updatePictureBlockData: build.mutation<any, { blockId: number; data: FormData; schoolName: string }>({
      query: arg => ({
        url: `/${arg.schoolName}/blocks/${arg.blockId}/`,
        method: 'PATCH',
        body: arg.data,
      }),
      invalidatesTags: ['updateBlock'],
    }),
    createButtons: build.mutation<any, { data: BlockButtonT; schoolName: string }>({
      query: arg => ({
        url: `/${arg.schoolName}/block_buttons/`,
        method: 'POST',
        body: arg.data,
      }),
    }),
    updateButtonsData: build.mutation<any, { data: IButton; schoolName: string }>({
      query: arg => ({
        url: `/${arg.schoolName}/block_buttons/${arg.data.id}/`,
        method: 'PATCH',
        body: arg.data,
      }),
    }),
    deleteButton: build.mutation<void, { id: number; schoolName: string }>({
      query: arg => ({
        url: `/${arg.schoolName}/block_buttons/${arg.id}/`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useCreateBlockMutation,
  useDeleteBlockMutation,
  useUpdateBlockDataMutation,
  useOrderUpdateMutation,
  useUpdatePictureBlockDataMutation,
  useCreateButtonsMutation,
  useUpdateButtonsDataMutation,
  useDeleteButtonMutation,
} = blocksService
