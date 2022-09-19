import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'

export const lessonsServices = createApi({
  reducerPath: 'lessonsServices',
  baseQuery,
  tagTypes: ['lessonsServices', 'modulesServices'],
  endpoints: build => ({
    fetchLesson: build.query({
      query: id => ({
        url: `/lessons/${id}/`,
      }),
      providesTags: ['lessonsServices', 'modulesServices'],
    }),
    createLessons: build.mutation({
      query: arg => ({
        url: `./lessons/`,
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['lessonsServices', 'modulesServices'],
    }),
    deleteLessons: build.mutation({
      query: id => ({
        url: `/lessons/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['lessonsServices', 'modulesServices'],
    }),
    patchLessons: build.mutation({
      query: arg => {
        return {
          url: `/lessons/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['lessonsServices', 'modulesServices'],
    }),
  }),
})

export const { useFetchLessonQuery, useCreateLessonsMutation, useDeleteLessonsMutation, usePatchLessonsMutation } = lessonsServices
