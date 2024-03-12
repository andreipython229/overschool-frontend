import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { CatalogCourseT, CatalogResponseT } from './apiTypes'
import { CoursesDataT } from 'types/CoursesT'

export const catalogService = createApi({
  reducerPath: 'catalogService',
  baseQuery: baseQuery(),
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
    fetchCourseDataFromCatalog: build.mutation<CatalogCourseT, number>({
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
  }),
})

export const { useFetchCourseCatalogQuery, useFilteredSearchMutation, useFetchCourseDataFromCatalogMutation, useSendCourseAppealMutation } =
  catalogService
