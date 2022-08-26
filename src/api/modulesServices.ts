import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store/redux/store'

export const modulesServices = createApi({
  reducerPath: 'modulesServices',
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

  //tagTypes: ['allCourses'],
  endpoints: build => ({
    fetchModules: build.query({
      query: () => ({
        url: `/sections/`,
      }),
      //providesTags: () => ['allCourses'],
    }),
    // createCourses: build.mutation({
    //   query: course => ({
    //     url: `/courses/`,
    //     method: 'POST',
    //     body: course,
    //   }),
    //   //invalidatesTags: ['allCourses'],
    // }),
    // deleteCourses: build.mutation({
    //   query: id => ({
    //     url: `/courses/${id}/`,
    //     method: 'DELETE',
    //   }),
    //   //invalidatesTags: ['allCourses'],
    // }),
    // updateCourses: build.mutation({
    //   query: (arg): string | FetchArgs => {
    //     console.log(arg)
    //     return {
    //       url: `/courses/${arg.id}/`,
    //       method: 'PUT',
    //       body: arg.formdata,
    //     }
    //   },
    //   //invalidatesTags: ['allCourses'],
    // }),
    // patchCourses: build.mutation({
    //   query: (arg): string | FetchArgs => {
    //     return {
    //       url: `/courses/${arg.id}/`,
    //       method: 'PATCH',
    //       body: arg.formdata,
    //     }
    //   },
    //   //invalidatesTags: ['allCourses'],
    // }),
  }),
})

export const { useFetchModulesQuery } = modulesServices
