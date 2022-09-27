import { createApi, FetchArgs } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'
import { CoursesT } from '../types/CoursesT'
import { UpdateCourses } from './apiTypes'

export const coursesServices = createApi({
  reducerPath: 'coursesServices',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['allCourses'],
  endpoints: build => ({
    fetchCourses: build.query<CoursesT[], void>({
      query: () => ({
        url: `/courses/`,
      }),
      providesTags: () => ['allCourses'],
    }),
    fetchCourse: build.query<CoursesT, string>({
      query: id => ({
        url: `/courses/${id}/`,
      }),
      providesTags: () => ['allCourses'],
    }),
    createCourses: build.mutation<FormData, FormData>({
      query: course => {
        return {
          url: `/courses/`,
          method: 'POST',
          body: course,
        }
      },
      invalidatesTags: ['allCourses'],
    }),
    deleteCourses: build.mutation<FormData, string>({
      query: id => ({
        url: `/courses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['allCourses'],
    }),
    patchCourses: build.mutation<FormData, UpdateCourses>({
      query: (arg): string | FetchArgs => {
        return {
          url: `/courses/${arg?.id}/`,
          method: 'PATCH',
          body: arg?.formdata,
        }
      },
      invalidatesTags: ['allCourses', 'allCourses'],
    }),
    cloneCourse: build.mutation({
      query: (id): string | FetchArgs => {
        return {
          url: `/courses/${id}/clone/`,
          method: 'GET',
        }
      },
      invalidatesTags: ['allCourses'],
    }),
  }),
})

export const {
  useFetchCoursesQuery,
  useFetchCourseQuery,
  useCreateCoursesMutation,
  useDeleteCoursesMutation,
  usePatchCoursesMutation,
  useCloneCourseMutation,
} = coursesServices
