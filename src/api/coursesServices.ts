import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { CoursesT, CoursesDataT, CourseWithGroupsT } from '../types/CoursesT'
import { UpdateCourses } from './apiTypes'
import { baseQueryWithReauth } from './baseQueryReauth'

export const coursesServices = createApi({
  reducerPath: 'coursesServices',
  baseQuery: baseQueryWithReauth,
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
    cloneCourse: build.mutation<CoursesDataT, { id: number; schoolName: string; userEmail: string }>({
      query: ({ id, schoolName, userEmail }) => {
        return {
          url: `/${schoolName}/courses/${id}/clone/?user_email=${encodeURIComponent(userEmail)}`,
          method: 'GET',
        }
      },
      invalidatesTags: ['courses'],
    }),
    fetchCourseCopyOwners: build.query<any, { schoolName: string; courseName: string; id: number }>({
      query: ({ courseName, schoolName, id }) => ({
        url: `/${schoolName}/courses/${id}/get_course_copy_owners/`,
        method: 'GET',
        params: { course_name: courseName },
      }),
    }),
    deleteCourseCopyAccess: build.mutation<any, { emails: string[]; schoolName: string; courseName: string; id: number }>({
      query: ({ emails, courseName, schoolName, id }) => ({
        url: `/${schoolName}/courses/${id}/delete_course_access/`,
        method: 'PATCH',
        body: { user_emails: emails, course_name: courseName },
      }),
      invalidatesTags: ['courses', 'course'],
    }),
  }),
})

export const CoursesPageService = createApi({
  reducerPath: 'CoursesPageService',
  baseQuery: baseQueryWithReauth,
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
  useLazyFetchCoursesGroupsQuery,
  useFetchCourseQuery,
  useLazyFetchCourseQuery,
  useCreateCoursesMutation,
  useDeleteCoursesMutation,
  usePatchCoursesMutation,
  useCloneCourseMutation,
  useFetchCourseCopyOwnersQuery,
  useLazyFetchCourseCopyOwnersQuery,
  useDeleteCourseCopyAccessMutation,
  useFetchCourseFoldersQuery,
  useCreateNewFoldersMutation,
  useDeleteFolderMutation,
} = coursesServices

export const { useFetchCoursesPageQuery, useLazyFetchCoursesPageQuery } = CoursesPageService
