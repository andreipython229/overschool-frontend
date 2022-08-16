import { fetchBaseQuery, createApi, FetchArgs } from '@reduxjs/toolkit/dist/query/react'

export const coursesServices = createApi({
  reducerPath: 'getAllCourses',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.itdev.by/api' }),
  tagTypes: ['allCourses'],
  endpoints: build => ({
    fetchCourses: build.query<any, any>({
      query: () => ({
        url: `/courses/`,
      }),
      providesTags: () => ['allCourses'],
    }),
    createCourses: build.mutation<any, any>({
      query: course => ({
        url: `/courses/`,
        method: 'POST',
        body: course,
      }),
      invalidatesTags: ['allCourses'],
    }),
    deleteCourses: build.mutation<any, any>({
      query: id => ({
        url: `/courses/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['allCourses'],
    }),
    updateCourses: build.mutation<any, any>({
      query: (arg): string | FetchArgs => {
        return {
          url: `/courses/${arg.id}/`,
          method: 'PUT',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['allCourses'],
    }),
  }),
})

export const {
  useFetchCoursesQuery,
  useCreateCoursesMutation,
  useDeleteCoursesMutation,
  useUpdateCoursesMutation,
} = coursesServices
