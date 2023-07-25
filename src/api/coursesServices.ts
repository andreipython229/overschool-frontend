import { createApi } from '@reduxjs/toolkit/dist/query/react'

import {baseQuery, baseQueryFn} from './baseApi'
import { CoursesT, CoursesDataT } from '../types/CoursesT'
import { UpdateCourses } from './apiTypes'

export const coursesServices = createApi({
  reducerPath: 'coursesServices',
  baseQuery: baseQueryFn(),
  tagTypes: ['courses', 'course'],
  endpoints: build => ({
    fetchCourses: build.query<CoursesT, void>({  
      query: () => ({
        url: `/courses/`,
      }),
      providesTags: ['courses', 'course'],
    }),
    fetchCourse: build.query<CoursesDataT, string | number>({
      query: id => ({
        url: `/courses/${id}/`,
      }),
    }),
    createCourses: build.mutation<CoursesDataT, FormData>({
      query: course => {
        return {
          url: `/courses/`,
          method: 'POST',
          body: course,
        }
      },
      invalidatesTags: ['courses'],
    }),
    deleteCourses: build.mutation<FormData, number>({
      query: id => ({
        url: `/courses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['course', 'courses'],
    }),
    patchCourses: build.mutation<FormData, UpdateCourses>({
      query: arg => {
        return {
          url: `/courses/${arg?.id}/`,
          method: 'PATCH',
          body: arg?.formdata,
        }
      },
      invalidatesTags: ['course'],
    }),
    cloneCourse: build.mutation<CoursesDataT, number>({
      query: id => {
        return {
          url: `/courses/${id}/clone/`,
          method: 'GET',
        }
      },
      invalidatesTags: ['courses'],
    }),
  }),
})

export const {
  useFetchCoursesQuery,
  useFetchCourseQuery,
  useLazyFetchCourseQuery,
  useCreateCoursesMutation,
  useDeleteCoursesMutation,
  usePatchCoursesMutation,
  useCloneCourseMutation,
} = coursesServices
