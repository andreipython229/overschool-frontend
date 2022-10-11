import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './baseApi'
import { sectionsT } from '../types/sectionT'

export const modulesServices = createApi({
  reducerPath: 'modulesServices',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['modulesServices', 'patchLesson', 'createModule'],
  endpoints: build => ({
    fetchModules: build.query<sectionsT, string>({
      query: id => {
        return {
          url: `/courses/${id}/sections/`,
        }
      },
      providesTags: () => ['modulesServices'],
    }),
    fetchModuleLessons: build.query({
      query: sectionId => ({
        url: `sections/${sectionId}/lessons`,
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
      query: ({ id, type }) => ({
        url: `/${type}s/${id}/`,
      }),
      providesTags: ['patchLesson'],
    }),
    createLessons: build.mutation({
      query: arg => {
        return {
          url: `/${arg.type}/`,
          method: 'POST',
          body: arg.createLessonData,
        }
      },
      invalidatesTags: ['modulesServices'],
    }),
    deleteLessons: build.mutation({
      query: ({ id, type }) => ({
        url: `/${type}s/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['modulesServices'],
    }),
    patchLessons: build.mutation({
      query: arg => {
        return {
          url: `/${arg.type}s/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['modulesServices', 'patchLesson'],
    }),
  }),
})

export const {
  useFetchModulesQuery,
  useFetchModuleLessonsQuery,
  useCreateModulesMutation,
  useDeleteModulesMutation,
  usePatchModulesMutation,
  useFetchLessonQuery,
  useCreateLessonsMutation,
  useDeleteLessonsMutation,
  usePatchLessonsMutation,
} = modulesServices
