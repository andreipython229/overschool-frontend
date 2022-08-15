import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'

export const getAllCoursesService = createApi({
  reducerPath: 'getAllCourses',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.itdev.by/api' }),
  tagTypes: ['allCourses'],
  endpoints: build => ({
    fetchCourses: build.query<any, any>({
      query: () => ({
        url: `/courses/`,
        params: {},
      }),
      providesTags: () => ['allCourses'],
    }),
    createCourses: build.mutation<any, any>({
      query: course => ({
        url: `/courses/`,
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['allCourses'],
    }),
  }),
})

export const { useFetchCoursesQuery, useCreateCoursesMutation } = getAllCoursesService
