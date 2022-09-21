import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'

export const modulesServices = createApi({
  reducerPath: 'modulesServices',
  baseQuery,
  tagTypes: ['modulesServices'],
  endpoints: build => ({
    fetchModules: build.query({
      query: id => ({
        url: `/courses/${id}/sections/`,
      }),
      providesTags: () => ['modulesServices'],
    }),
    createModules: build.mutation({
      query: arg => ({
        url: `./sections/`,
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['modulesServices'],
    }),
    deleteModules: build.mutation({
      query: id => ({
        url: `/sections/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['modulesServices'],
    }),
    patchModules: build.mutation({
      query: arg => {
        return {
          url: `/sections/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['modulesServices'],
    }),
    fetchLesson: build.query({
      query: id => ({
        url: `/lessons/${id}/`,
      }),
    }),
    createLessons: build.mutation({
      query: arg => ({
        url: `./lessons/`,
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['modulesServices'],
    }),
    deleteLessons: build.mutation({
      query: id => ({
        url: `/lessons/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['modulesServices'],
    }),
    patchLessons: build.mutation({
      query: arg => {
        return {
          url: `/lessons/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['modulesServices'],
    }),
  }),
})

export const {
  useFetchModulesQuery,
  useCreateModulesMutation,
  useDeleteModulesMutation,
  usePatchModulesMutation,
  useFetchLessonQuery,
  useCreateLessonsMutation,
  useDeleteLessonsMutation,
  usePatchLessonsMutation,
} = modulesServices
