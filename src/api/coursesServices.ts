import { createApi, FetchArgs } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { CoursesT } from '../types/CoursesT'
import { UpdateCourses } from './apiTypes'

export const coursesServices = createApi({
  reducerPath: 'coursesServices',
  baseQuery,
  tagTypes: ['coursesServices', 'oneCurses'],
  endpoints: build => ({
    fetchCourses: build.query<CoursesT[], void>({
      query: () => ({
        url: `/courses/`,
      }),
      providesTags: () => ['coursesServices'],
    }),
    fetchCourse: build.query<CoursesT, string>({
      query: id => ({
        url: `/courses/${id}/`,
      }),
      providesTags: () => ['oneCurses'],
    }),
    createCourses: build.mutation<FormData, FormData>({
      query: course => {
        return {
          url: `/courses/`,
          method: 'POST',
          body: course,
        }
      },
      invalidatesTags: ['coursesServices'],
    }),
    deleteCourses: build.mutation<FormData, string>({
      query: id => ({
        url: `/courses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['coursesServices'],
    }),
    patchCourses: build.mutation<FormData, UpdateCourses>({
      query: (arg): string | FetchArgs => {
        return {
          url: `/courses/${arg?.id}/`,
          method: 'PATCH',
          body: arg?.formdata,
        }
      },
      invalidatesTags: ['coursesServices', 'oneCurses'],
    }),
    cloneCourse: build.mutation({
      query: (id): string | FetchArgs => {
        return {
          url: `/courses/${id}/clone/`,
          method: 'GET',
        }
      },
      invalidatesTags: ['coursesServices'],
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
