import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { ISubscribe } from 'components/Modal/TariffDetailModal/TariffDetailModal'

export const subscriptionService = createApi({
  reducerPath: 'subscriptionService',
  baseQuery: baseQuery(),
  tagTypes: ['subscription'],
  endpoints: build => ({
    sendSubscriptionForm: build.mutation<any, ISubscribe>({
      query: (data: ISubscribe) => ({
        url: '/subscribe_client/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useSendSubscriptionFormMutation } = subscriptionService
