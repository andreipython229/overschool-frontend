import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'

export const getAllCoursesService = createApi({
  reducerPath: 'getAllCourses',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://194.62.19.27:8000/api' }),
  tagTypes: ['allCourses'],
  endpoints: build => ({
    fetchCourses: build.query<any, any>({
      query: () => ({
        url: `/courses/`,
        params: {},
      }),
      providesTags: result => ['allCourses'],
    }),
    // createCourses: build.mutation<any, any>({
    //   query: course => ({
    //     url: `/courses/`,
    //     method: 'POST',
    //     body: course,
    //   }),
    //   invalidatesTags: ['allCourses'],
    // }),
  }),
})

export const { useFetchCoursesQuery } = getAllCoursesService
