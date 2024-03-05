import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { CatalogResponseT } from './apiTypes'
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
    fetchCourseDataFromCatalog: build.mutation<CoursesDataT, number>({
      query: id => ({
        url: `/course_catalog/${id}`,
      }),
    }),
  }),
})

export const { useFetchCourseCatalogQuery, useFilteredSearchMutation, useFetchCourseDataFromCatalogMutation } = catalogService
