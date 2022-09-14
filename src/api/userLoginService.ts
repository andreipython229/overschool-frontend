import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'
import { formDataConverter } from '../utils/formDataConverter'
import { RootState } from '../store/redux/store'
import { ICredentials, IResponse } from './apiTypes'

export const userLoginService = createApi({
  reducerPath: 'userLoginService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token

      if (token) {
        headers.set('Authenticate', `Token ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<IResponse, ICredentials>({
      query: credentials => {
        const formdata = formDataConverter(credentials)
        return {
          url: '/login_user/',
          method: 'POST',
          redirect: 'follow',
          body: formdata,
        }
      },
    }),
  }),
})
export const { useLoginMutation } = userLoginService
