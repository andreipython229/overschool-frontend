import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { BonusT } from '../types/bonusesT'
import { baseQueryWithReauth } from './baseQueryReauth'
import { IBanner, IBox, IOpenBox, IPrize, ISchoolBoxes, ISchoolBoxesCreate, ISchoolPrizeWinner } from './apiTypes'
import { url } from 'inspector'
import { number, string } from 'yup'
import { method } from 'lodash'

export const schoolBonusService = createApi({
  reducerPath: 'schoolBonusService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['bonuses', 'bonus'],
  endpoints: build => ({
    fetchBonuses: build.query<BonusT[], string>({
      query: schoolName => ({
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
    getSchoolBanners: build.query<IBanner[], string>({
      query: schoolName => `/${schoolName}/banners/`,
    }),
    getStudentBanner: build.query<IBanner, string>({
      query: schoolName => `/${schoolName}/banners/`,
    }),
    updateSchoolBanner: build.mutation<IBanner, { schoolName: string; data: FormData; id: number }>({
      query: args => ({
        url: `/${args.schoolName}/banners/${args.id}/`,
        method: 'PATCH',
        body: args.data,
      }),
    }),
    createNewBanner: build.mutation<IBanner, { data: FormData; schoolName: string }>({
      query: args => ({
        url: `/${args.schoolName}/banners/`,
        method: 'POST',
        body: args.data,
      }),
    }),
    deleteBanner: build.mutation<any, { id: number | string; schoolName: string }>({
      query: args => ({
        url: `/${args.schoolName}/banners/${args.id}/`,
        method: 'DELETE',
      }),
    }),
    acceptBanner: build.mutation<IBanner, { id: string | number; schoolName: string }>({
      query: args => ({
        url: `/${args.schoolName}/banners/${args.id}/accept/`,
        method: 'POST',
      }),
    }),
    fetchSchoolBoxes: build.query<ISchoolBoxes[], string>({
      query: schoolName => `/${schoolName}/school_box/`,
    }),
    createSchoolBox: build.mutation<any, { data: FormData; schoolName: string }>({
      query: args => ({
        url: `/${args.schoolName}/school_box/`,
        method: 'POST',
        body: args.data,
      }),
    }),
    fetchSchoolPrizes: build.query<IPrize[], string>({
      query: schoolName => `/${schoolName}/school_prize/`,
    }),
    fetchUserBoxes: build.query<IBox[], string>({
      query: school => `/${school}/user_boxes/`,
    }),
    updateSchoolBox: build.mutation<IBox[], { schoolName: string; id: number; data: FormData }>({
      query: args => ({ url: `/${args.schoolName}/school_box/${args.id}/`, method: 'PATCH', body: args.data }),
    }),
    updateSchoolBoxes: build.mutation<ISchoolBoxes[], { schoolName: string; data: ISchoolBoxes[] }>({
      query: args => ({ url: `/${args.schoolName}/school_box/bulk_update/`, method: 'PATCH', body: args.data }),
    }),
    deleteSchoolBoxes: build.mutation<ISchoolBoxes[], { schoolName: string; ids: number[] }>({
      query: args => ({ url: `/${args.schoolName}/school_box/bulk_delete/`, method: 'DELETE', body: { ids: args.ids } }),
    }),
    updateSchoolPrizes: build.mutation<IPrize[], { schoolName: string; data: IPrize[] }>({
      query: args => ({ url: `/${args.schoolName}/school_prize/bulk_update/`, method: 'PATCH', body: args.data }),
    }),
    deleteSchoolPrizes: build.mutation<IPrize[], { schoolName: string; ids: number[] }>({
      query: args => ({ url: `/${args.schoolName}/school_prize/bulk_delete/`, method: 'DELETE', body: { ids: args.ids } }),
    }),
    openUserBox: build.mutation<IOpenBox, { schoolName: string; boxId: number | string }>({
      query: args => ({
        url: `/${args.schoolName}/open_box/${args.boxId}/`,
        method: 'POST',
      }),
    }),
    getBoxPaymentLink: build.mutation<{ payment_link: string }, { data: FormData; school: string }>({
      query: args => ({
        url: `/${args.school}/box_payment_link/`,
        method: 'POST',
        body: args.data,
      }),
    }),
    updateSchoolPrize: build.mutation<IPrize, { schoolName: string; id: number; data: FormData }>({
      query: args => ({
        url: `/${args.schoolName}/school_prize/${args.id}/`,
        method: 'PATCH',
        body: args.data,
      }),
    }),
    createSchoolPrize: build.mutation<IPrize, { schoolName: string; data: FormData }>({
      query: args => ({
        url: `/${args.schoolName}/school_prize/`,
        method: 'POST',
        body: args.data,
      }),
    }),
    getAllSchoolPrizeWinners: build.query<ISchoolPrizeWinner[], string>({
      query: school => `/${school}/user_prizes/`,
    }),
  }),
})

export const {
  useDeleteSchoolPrizesMutation,
  useUpdateSchoolPrizesMutation,
  useDeleteSchoolBoxesMutation,
  useUpdateSchoolBoxesMutation,
  useGetAllSchoolPrizeWinnersQuery,
  useCreateSchoolPrizeMutation,
  useUpdateSchoolPrizeMutation,
  useUpdateSchoolBoxMutation,
  useCreateSchoolBoxMutation,
  useGetBoxPaymentLinkMutation,
  useOpenUserBoxMutation,
  useFetchUserBoxesQuery,
  useFetchSchoolPrizesQuery,
  useFetchSchoolBoxesQuery,
  useAcceptBannerMutation,
  useDeleteBannerMutation,
  useCreateNewBannerMutation,
  useUpdateSchoolBannerMutation,
  useGetSchoolBannersQuery,
  useLazyGetStudentBannerQuery,
  useFetchBonusesQuery,
  useLazyFetchBonusesQuery,
  useFetchBonusQuery,
  useCreateBonusMutation,
  useDeleteBonusMutation,
  usePatchBonusMutation,
} = schoolBonusService
