import { fetchBaseQuery, createApi, FetchArgs } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store/redux/store'
import { CoursesT } from '../store/redux/courses/slice'

export const coursesServices = createApi({
  reducerPath: 'getAllCourses',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.user?.token

      if (token) {
        headers.set('Authorization', `Token ${token}`)
        headers.set('mode', 'no-cors')
      }
      return headers
    },
  }),

  tagTypes: ['allCourses'],
  endpoints: build => ({
    fetchCourses: build.query<CoursesT[], null>({
      query: () => ({
        url: `/courses/`,
      }),
      providesTags: () => ['allCourses'],
    }),
    createCourses: build.mutation({
      query: course => ({
        url: `/courses/`,
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['allCourses'],
    }),
    deleteCourses: build.mutation({
      query: id => ({
        url: `/courses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['allCourses'],
    }),
    updateCourses: build.mutation({
      query: (arg): string | FetchArgs => {
        return {
          url: `/courses/${arg.id}/`,
          method: 'PUT',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['allCourses'],
    }),
    patchCourses: build.mutation({
      query: (arg): string | FetchArgs => {
        return {
          url: `/courses/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['allCourses'],
    }),
  }),
})

export const { useFetchCoursesQuery, useCreateCoursesMutation, useDeleteCoursesMutation, useUpdateCoursesMutation, usePatchCoursesMutation } =
  coursesServices
