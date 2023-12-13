import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { ISubscribe } from 'components/Modal/TariffDetailModal/TariffDetailModal'

export const subscriptionService = createApi({
  reducerPath: 'subscriptionService',
  baseQuery: baseQuery(),
  tagTypes: ['subscription'],
  endpoints: build => ({
    sendSubscriptionForm: build.mutation<any, { data: ISubscribe; schoolName: string }>({
      query: ({ data, schoolName }) => ({
        url: `/${schoolName}/subscribe/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['subscription'],
    }),
  }),
})

export const { useSendSubscriptionFormMutation } = subscriptionService
