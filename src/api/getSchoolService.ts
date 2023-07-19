import { createApi } from '@reduxjs/toolkit/dist/query/react'

import {baseQuery} from './baseApi'

export const getSchoolService = createApi({
  reducerPath: 'getSchoolService',
  baseQuery,
  endpoints: builder => ({
    getSchools: builder.mutation<void, void>({
      query: () => {
        return {
          url: '/user-schools/',
          method: 'GET',
          redirect: 'follow',
          responseHandler: response => response.text(),
        }
      }
    })
  })
})
export const { useGetSchoolsMutation } = getSchoolService
