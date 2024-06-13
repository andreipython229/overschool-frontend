import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { CoursesT, CoursesDataT, CourseWithGroupsT } from '../types/CoursesT'
import { UpdateCourses } from './apiTypes'

export const coursesServices = createApi({
  reducerPath: 'coursesServices',
  baseQuery: baseQuery(),
  tagTypes: ['courses', 'course'],
  endpoints: build => ({
    fetchCourseFolders: build.query<any, string>({
      query: school => `/${school}/folder_course/`,
    }),
    createNewFolders: build.mutation<any, { data: { name: string }; schoolName: string }>({
      query: arg => ({ url: `/${arg.schoolName}/folder_course/`, method: 'POST', body: arg.data }),
    }),
    deleteFolder: build.mutation<any, { id: number; schoolName: string }>({
      query: arg => ({ url: `/${arg.schoolName}/folder_course/${arg.id}/`, method: 'DELETE' }),
    }),
    fetchCourses: build.query<CoursesT, string>({
      query: (schoolName: string) => ({
        url: `/${schoolName}/courses/`,
      }),
      providesTags: ['courses', 'course'],
    }),
    fetchCoursesGroups: build.query<CourseWithGroupsT[], string>({
      query: (schoolName: string) => ({
        url: `/${schoolName}/courses/with_student_groups`,
      }),
      providesTags: ['courses', 'course'],
    }),
    fetchCourse: build.query<CoursesDataT, { id: string | number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/courses/${id}/`,
      }),
    }),
    createCourses: build.mutation<CoursesDataT, { course: FormData; schoolName: string }>({
      query: ({ course, schoolName }) => {
        return {
          url: `/${schoolName}/courses/`,
          method: 'POST',
          body: course,
        }
      },
      invalidatesTags: ['courses'],
    }),
    deleteCourses: build.mutation<FormData, { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/courses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['course', 'courses'],
    }),
    patchCourses: build.mutation<any, { arg: UpdateCourses; schoolName: string }>({
      query: ({ arg, schoolName }) => {
        return {
          url: `/${schoolName}/courses/${arg?.id}/`,
          method: 'PATCH',
          body: arg?.formdata,
        }
      },
      invalidatesTags: ['course'],
    }),
    cloneCourse: build.mutation<CoursesDataT, { id: number; schoolName: string }>({
      query: ({ id, schoolName }) => {
        return {
          url: `/${schoolName}/courses/${id}/clone/`,
          method: 'GET',
        }
      },
      invalidatesTags: ['courses'],
    }),
  }),
})

export const CoursesPageService = createApi({
  reducerPath: 'CoursesPageService',
  baseQuery: baseQuery(),
  tagTypes: ['CoursesPage'],
  endpoints: build => ({
    fetchCoursesPage: build.query<CoursesT, string>({
      query: school => ({
        url: `/${school}/courses/`,
      }),
    }),
  }),
})

export const {
  useLazyFetchCoursesQuery,
  useFetchCoursesQuery,
  useFetchCoursesGroupsQuery,
  useFetchCourseQuery,
  useLazyFetchCourseQuery,
  useCreateCoursesMutation,
  useDeleteCoursesMutation,
  usePatchCoursesMutation,
  useCloneCourseMutation,
  useFetchCourseFoldersQuery,
  useCreateNewFoldersMutation,
  useDeleteFolderMutation,
} = coursesServices

export const { useFetchCoursesPageQuery, useLazyFetchCoursesPageQuery } = CoursesPageService
