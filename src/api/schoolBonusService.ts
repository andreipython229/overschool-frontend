import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { BonusT } from '../types/bonusesT'
import { baseQueryWithReauth } from './baseQueryReauth'

export const schoolBonusService = createApi({
  reducerPath: 'schoolBonusService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['bonuses', 'bonus'],
  endpoints: build => ({
    fetchBonuses: build.query<BonusT[], string>({
      query: (schoolName) => ({
        url: `/${schoolName}/school_bonuses/`,
      }),
      providesTags: ['bonuses', 'bonus'],
    }),
    fetchBonus: build.query<BonusT, { id: string | number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/school_bonuses/${id}/`,
      }),
    }),
    createBonus: build.mutation<BonusT, { bonus: any; schoolName: string }>({
      query: ({ bonus, schoolName }) => {
        return {
          url: `/${schoolName}/school_bonuses/`,
          method: 'POST',
          body: bonus,
        }
      },
      invalidatesTags: ['bonuses', 'bonus'],
    }),
    deleteBonus: build.mutation<FormData, { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/school_bonuses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bonuses', 'bonus'],
    }),
    patchBonus: build.mutation<BonusT, { data: any; id: number; schoolName: string }>({
      query: ({ data, id, schoolName }) => {
        return {
          url: `/${schoolName}/school_bonuses/${id}/`,
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['bonus'],
    }),
  }),
})

export const {
  useFetchBonusesQuery,
  useLazyFetchBonusesQuery,
  useFetchBonusQuery,
  useCreateBonusMutation,
  useDeleteBonusMutation,
  usePatchBonusMutation,
} = schoolBonusService
