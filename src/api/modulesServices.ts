import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store/redux/store'

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
  }),
})

export const { useFetchModulesQuery, useCreateModulesMutation, useDeleteModulesMutation, usePatchModulesMutation } = modulesServices
