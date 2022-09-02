import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'

import { schoolHeaderResT } from '../types/schoolHeaderT'
import { RootState } from '../store/redux/store'


export const schoolHeaderService = createApi({
  reducerPath: 'coursesHeaderService',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.user?.token

      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }
      return headers
    },
  }),

  tagTypes: ['schoolHeader'],
  endpoints: build => ({
    fetchSchoolHeader: build.query<schoolHeaderResT, number>({
      query: (id?: number) => ({
        url: `/course_header/${id}/`,
      }),
    }),
    setSchoolHeader: build.mutation<schoolHeaderResT, { formData: FormData; id: number }>({
      query: ({ formData, id }) => ({
        url: `/course_header/${id}/`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['schoolHeader'],
    }),
  }),
})

export const { useFetchSchoolHeaderQuery, useSetSchoolHeaderMutation } = schoolHeaderService
