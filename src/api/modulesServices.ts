import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { sectionT, sectionsT, commonLessonT } from 'types/sectionT'
import { baseQueryFn } from './baseApi'

export const modulesServices = createApi({
  reducerPath: 'modulesServices',
  baseQuery: baseQueryFn(),
  tagTypes: ['modules', 'lessons', 'patchLessons'],
  endpoints: build => ({
    fetchModules: build.query<sectionsT, string>({
      query: id => ({
        url: `/courses/${id}/sections/`,
      }),
      providesTags: ['modules', 'lessons'],
    }),
    fetchModuleLessons: build.query<sectionT, string>({
      query: sectionId => ({
        url: `/sections/${sectionId}/lessons/`,
      }),
      providesTags: ['lessons'],
    }),
    createModules: build.mutation<void, FormData>({
      query: arg => ({
        url: `/sections/`,
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['modules'],
    }),
    deleteModules: build.mutation<void, number>({
      query: id => ({
        url: `/sections/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['modules'],
    }),
    patchModules: build.mutation<void, { formdata: FormData; id: number }>({
      query: arg => {
        return {
          url: `/sections/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['modules'],
    }),
    fetchLesson: build.query<commonLessonT, { id: number; type: string }>({
      query: ({ id, type }) => ({
        url: `/${type}s/${id}/`,
      }),
      providesTags: ['patchLessons'],
    }),
    fetchLessons: build.query<commonLessonT[], string>({
      query: type => ({
        url: `/${type}s/`,
      }),
      // providesTags: ['lessons'],
    }),
    createLessons: build.mutation({
      query: arg => {
        return {
          url: `/${arg.type}/`,
          method: 'POST',
          body: arg.createLessonData,
        }
      },
      invalidatesTags: ['modules', 'lessons'],
    }),
    deleteLessons: build.mutation<void, { id: number; type: string }>({
      query: ({ id, type }) => ({
        url: `/${type}s/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['modules', 'lessons'],
    }),
    patchLessons: build.mutation<void, { id: number; type: string; formdata: FormData }>({
      query: arg => {
        return {
          url: `/${arg.type}s/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['modules', 'patchLessons'],
    }),
    updateLessonsOrders: build.mutation<void, { data: { baselesson_ptr_id: number | undefined; order: number }[] }>({
      query: arg => {
        return {
          url: `/lesson_order/`,
          method: 'POST',
          body: arg.data,
        }
      },
      invalidatesTags: ['modules', 'lessons'],
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
  useFetchLessonsQuery,
  useCreateLessonsMutation,
  useDeleteLessonsMutation,
  usePatchLessonsMutation,
  useUpdateLessonsOrdersMutation,
} = modulesServices
