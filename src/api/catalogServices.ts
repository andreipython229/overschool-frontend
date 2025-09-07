import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { CatalogCourseT, CatalogResponseT } from './apiTypes'
import { CoursesDataT } from 'types/CoursesT'
import { appealStatT, appealsStatT } from 'types/schoolsT'
import { BlockKeys } from '../Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/types/blocksControllerT'
import { baseQueryWithReauth } from './baseQueryReauth'

export const catalogService = createApi({
  reducerPath: 'catalogService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['catalog'],
  endpoints: build => ({
    fetchCourseCatalog: build.query<CatalogResponseT, number>({
      query: page => ({
        url: `/course_catalog/?p=${page}&s=12`,
      }),
    }),
    filteredSearch: build.mutation<CatalogResponseT, string>({
      query: filter => ({
        url: `/course_catalog/?p=1&s=12&query=${filter}`,
      }),
    }),
    fetchCourseDataFromCatalog: build.mutation<BlockKeys, number>({
      query: id => ({
        url: `/course_catalog/${id}`,
      }),
    }),
    sendCourseAppeal: build.mutation<any, FormData>({
      query: data => ({
        url: '/course-appeals/',
        method: 'POST',
        body: data,
      }),
    }),
    fetchSchoolAppeals: build.mutation<appealsStatT, any>({
      query: arg => ({
        url: `/${arg.schoolName}/course-appeals/?p=${arg.pageToFetch}`,
      }),
    }),
    fetchCurrentAppeal: build.mutation<appealStatT, { id: number; schoolName: string }>({
      query: arg => ({
        url: `/${arg.schoolName}/course-appeals/${arg.id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useFetchCourseCatalogQuery,
  useFilteredSearchMutation,
  useFetchCourseDataFromCatalogMutation,
  useSendCourseAppealMutation,
  useFetchSchoolAppealsMutation,
  useFetchCurrentAppealMutation,
} = catalogService
