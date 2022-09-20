import { createApi, FetchArgs } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { CoursesT } from '../types/CoursesT'
import { UpdateCourses } from './apiTypes'

export const coursesServices = createApi({
  reducerPath: 'coursesServices',
  baseQuery,
  tagTypes: ['allCourses'],
  endpoints: build => ({
    fetchCourses: build.query<CoursesT[], null>({
      query: () => ({
        url: `/courses/`,
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
    updateCourses: build.mutation<FormData, UpdateCourses>({
      query: (arg): string | FetchArgs => {
        return {
          url: `/courses/${arg.id}/`,
          method: 'PUT',
          body: arg.formdata,
        }
      },
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
      invalidatesTags: ['allCourses'],
    }),
  }),
})

export const { useFetchCoursesQuery, useCreateCoursesMutation, useDeleteCoursesMutation, useUpdateCoursesMutation, usePatchCoursesMutation } =
  coursesServices
