import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

// import { baseQuery } from './baseApi'

export const getSchoolService = createApi({
  reducerPath: 'getSchoolService',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: builder => ({
    getSchools: builder.mutation<any, void>({
      query: () => {
        return {
          url: '/user-schools/',
          method: 'GET',
          redirect: 'follow',
        }
      },
    }),
  }),
})
export const { useGetSchoolsMutation } = getSchoolService
