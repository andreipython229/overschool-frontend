import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { ISubscribe } from 'components/Modal/TariffDetailModal/TariffDetailModal'
import { baseQueryWithReauth } from './baseQueryReauth';

export const subscriptionService = createApi({
  reducerPath: 'subscriptionService',
  baseQuery: baseQueryWithReauth,
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
