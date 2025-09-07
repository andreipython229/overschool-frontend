import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './baseQueryReauth'
import { Feedback } from 'types/feedbacks'

export const feedbacksService = createApi({
  reducerPath: 'feedbacksService',
  baseQuery: baseQueryWithReauth,
  endpoints: build => ({
    fetchFeedbacks: build.query<Feedback[], void>({
      query: () => '/feedbacks/',
    }),
  }),
})

export const { useFetchFeedbacksQuery } = feedbacksService
