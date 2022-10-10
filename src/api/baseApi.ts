import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

import { token, auth } from '../store/redux/users/slice'
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

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const { user } = JSON.parse(`${localStorage?.getItem('persist:root')}`)
  const refreshToken = JSON.parse(user).refresh_token
  //const refreshToken = (getState() as RootState)?.user?.refresh_token

  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    const refreshResult: any = await baseQuery(
      {
        url: '/token-refresh/',
        method: 'POST',
        body: refreshToken,
      },
      api,
      extraOptions,
    )

    if (refreshResult?.data) {
      api.dispatch(token({ access_token: refreshResult.data?.access as string }))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(auth(false))
    }
  }
  return result
}
