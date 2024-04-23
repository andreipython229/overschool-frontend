import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { sectionT, sectionsT, commonLessonT, TestT } from 'types/sectionT'
import { baseQuery } from './baseApi'

type OrderT = {
  section_id: number | string
  order: number | string
}

export const modulesServices = createApi({
  reducerPath: 'modulesServices',
  baseQuery: baseQuery(),
  tagTypes: ['modules', 'lessons', 'patchLessons'],
  endpoints: build => ({
    fetchModules: build.query<sectionsT, { id: string; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/courses/${id}/sections/`,
      }),
      providesTags: ['modules', 'lessons'],
    }),
    fetchModuleLessons: build.query<sectionT, { sectionId: string; schoolName: string }>({
      query: ({ sectionId, schoolName }) => ({
        url: `/${schoolName}/sections/${sectionId}/lessons/`,
      }),
      providesTags: ['lessons'],
    }),
    createModules: build.mutation<void, { arg: FormData; schoolName: string }>({
      query: ({ arg, schoolName }) => ({
        url: `/${schoolName}/sections/`,
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['modules'],
    }),
    deleteModules: build.mutation<void, { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/sections/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['modules'],
    }),
    patchModules: build.mutation<void, { arg: { formdata: FormData; id: number }; schoolName: string }>({
      query: ({ arg, schoolName }) => {
        return {
          url: `/${schoolName}/sections/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['modules'],
    }),
    fetchLesson: build.query<commonLessonT, { id: number; type: string; schoolName: string }>({
      query: ({ id, type, schoolName }) => ({
        url: `/${schoolName}/${type}s/${id}/`,
      }),
      providesTags: ['patchLessons'],
    }),
    fetchLessons: build.query<commonLessonT[], { type: string; schoolName: string }>({
      query: ({ type, schoolName }) => ({
        url: `/${schoolName}/${type}s/`,
      }),
      // providesTags: ['lessons'],
    }),
    fetchPreviousTests: build.query<TestT[], { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/tests/${id}/previous_tests/`,
      }),
      providesTags: ['lessons'],
    }),
    createLessons: build.mutation<any, { arg: any; schoolName: string }>({
      query: ({ arg, schoolName }) => {
        return {
          url: `/${schoolName}/${arg.type}/`,
          method: 'POST',
          body: arg.createLessonData,
        }
      },
      invalidatesTags: ['modules', 'lessons'],
    }),
    deleteLessons: build.mutation<void, { id: number; type: string; schoolName: string }>({
      query: ({ id, type, schoolName }) => ({
        url: `/${schoolName}/${type}s/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['modules', 'lessons'],
    }),
    patchLessons: build.mutation<void, { arg: { id: number; type: string; formdata: FormData }; schoolName: string }>({
      query: ({ arg, schoolName }) => {
        return {
          url: `/${schoolName}/${arg.type}s/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['modules', 'patchLessons'],
    }),
    updateLessonsOrders: build.mutation<void, { arg: { data: { baselesson_ptr_id: number | undefined; order: number }[] }; schoolName: string }>({
      query: ({ arg, schoolName }) => {
        return {
          url: `/${schoolName}/lesson_order/`,
          method: 'POST',
          body: arg.data,
        }
      },
      invalidatesTags: ['modules', 'lessons'],
    }),
    changeModuleOrder: build.mutation<void, { data: OrderT[]; schoolName: string }>({
      query: arg => ({
        url: `/${arg.schoolName}/section_order/`,
        method: 'POST',
        body: arg.data,
      }),
    }),
  }),
})

export const {
  useFetchModulesQuery,
  useLazyFetchModulesQuery,
  useFetchModuleLessonsQuery,
  useLazyFetchModuleLessonsQuery,
  useCreateModulesMutation,
  useDeleteModulesMutation,
  usePatchModulesMutation,
  useLazyFetchLessonQuery,
  useFetchLessonQuery,
  useFetchLessonsQuery,
  useLazyFetchPreviousTestsQuery,
  useCreateLessonsMutation,
  useDeleteLessonsMutation,
  usePatchLessonsMutation,
  useUpdateLessonsOrdersMutation,
  useChangeModuleOrderMutation,
} = modulesServices
