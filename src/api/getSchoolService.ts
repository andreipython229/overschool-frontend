import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import {baseQuery} from "./baseApi";

// import { baseQuery } from './baseApi'

export const getSchoolService = createApi({
  reducerPath: 'getSchoolService',
  baseQuery: baseQuery('/api'),
  endpoints: builder => ({
    getSchools: builder.mutation<void, void>({
      query: () => {
        return {
          url: '/user-schools/',
          method: 'GET',
          redirect: 'follow',
          responseHandler: response => response.text(),
        }
      },
    }),
  }),
})
export const { useGetSchoolsMutation } = getSchoolService
