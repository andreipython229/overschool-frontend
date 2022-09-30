import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'

export const modulesServices = createApi({
  reducerPath: 'modulesServices',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['modulesServices'],
  endpoints: build => ({
    fetchModules: build.query({
      query: id => ({
        url: `/courses_data/?course_id=${id}`,
      }),
      providesTags: () => ['modulesServices'],
    }),
    // fetchModule: build.query({
    //   query: sectionId => ({
    //     url: `sections/${sectionId}`,
    //   }),
    //   providesTags: () => ['modulesServices'],
    // }),
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
      providesTags: ['modulesServices'],
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
  //useFetchModuleQuery,
  useFetchModuleLessonsQuery,
  useCreateModulesMutation,
  useDeleteModulesMutation,
  usePatchModulesMutation,
  useFetchLessonQuery,
  useCreateLessonsMutation,
  useDeleteLessonsMutation,
  usePatchLessonsMutation,
} = modulesServices
