import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryFn } from './baseApi'
import { ISubscribe } from 'components/Modal/TariffDetailModal/TariffDetailModal'

export const subscriptionService = createApi({
  reducerPath: 'subscriptionService',
  baseQuery: baseQueryFn(),
  tagTypes: ['subscription'],
  endpoints: build => ({
    sendSubscriptionForm: build.mutation<any, ISubscribe>({
      query: data => ({
        url: '/subscribe/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['subscription'],
    }),
  }),
})

export const { useSendSubscriptionFormMutation } = subscriptionService
