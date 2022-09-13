import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'

import { schoolHeaderResT } from '../types/schoolHeaderT'
import { RootState } from '../store/redux/store'
import { UpdateCourses } from './apiTypes'

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
        url: `/school_header/${id}/`,
      }),
      providesTags: ['schoolHeader'],
    }),
    setSchoolHeader: build.mutation<schoolHeaderResT, UpdateCourses>({
      query: ({ formdata, id }) => ({
        url: `/school_header/${id}/`,
        method: 'PATCH',
        body: formdata,
      }),
      invalidatesTags: ['schoolHeader'],
    }),
  }),
})

export const { useFetchSchoolHeaderQuery, useSetSchoolHeaderMutation } = schoolHeaderService
