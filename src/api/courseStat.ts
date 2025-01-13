import { createApi } from '@reduxjs/toolkit/dist/query/react'

import {studentsTableInfoT, studentsTableStatsT, bannerStatInfoT} from '../types/courseStatT'
import { baseQuery } from './baseApi'
import { createUrlWithParams } from 'utils/createUrlWithParams'
import { createUrlWithFiltersAndFields } from 'utils/createUrlWithFiltersAndFields'
import { baseQueryWithReauth } from './baseQueryReauth'

export const courseStatService = createApi({
  reducerPath: 'courseStat',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['courseStat', 'studentsPerGroup', 'studentPerSchool', 'AllStudentsPerGroup', 'AllCourseStat', 'BannerStat'],
  endpoints: build => ({
    fetchCourseStat: build.query<studentsTableStatsT, { id: string | number; filters: any; schoolName: string , page: string | number, fields: any[]}>({
      query: ({ id, filters, schoolName , page, fields}) => ({
        url: createUrlWithFiltersAndFields(`/${schoolName}/courses/${id}/get_students_for_course/?p=${page !== undefined ? page : 1}`, filters, fields),
      }),
      providesTags: ['courseStat'],
    }),
    fetchStudentsPerGroup: build.query<studentsTableStatsT, any>({
      query: ({ id, filters, schoolName, page, fields }) => ({
        url: createUrlWithFiltersAndFields(`/${schoolName}/students_group/${id}/get_students_for_group/?p=${page !== undefined ? page : 1}`, filters, fields),
      }),
      providesTags: ['studentsPerGroup'],
    }),
    fetchAllStudentsPerGroup: build.query<studentsTableInfoT, any>({
      query: ({ id, filters, schoolName }) => ({
        url: createUrlWithParams(`/${schoolName}/students_group/${id}/get_all_students_for_group/`, filters),
      }),
      providesTags: ['AllStudentsPerGroup'],
    }),
    fetchAllCourseStat: build.query<studentsTableInfoT, { id: string | number; filters: any; schoolName: string }>({
      query: ({ id, filters, schoolName }) => ({
        url: createUrlWithParams(`/${schoolName}/courses/${id}/get_all_students_for_course/`, filters),
      }),
      providesTags: ['AllCourseStat'],
    }),
    fetchBannerStat: build.query<bannerStatInfoT, { bannerId: string | number; start_date: string; end_date: string;  schoolName: string, filters: any  }>({
      query: ({ bannerId, start_date, end_date, schoolName, filters }) => {
        return {
          url: createUrlWithParams(`/${schoolName}/banners/${bannerId}/statistics/?start_date=${start_date}&end_date=${end_date}`, filters),
        };
      },
      providesTags: ['BannerStat'],
    }),
    
  }),
})

export const { useLazyFetchCourseStatQuery, useLazyFetchStudentsPerGroupQuery, useLazyFetchAllStudentsPerGroupQuery, useLazyFetchAllCourseStatQuery, useFetchBannerStatQuery } = courseStatService
