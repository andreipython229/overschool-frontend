import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { RootState } from '../store/redux/store'

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.user?.access_token

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})
