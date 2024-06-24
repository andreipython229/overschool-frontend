import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import {BlockKeys} from "Pages/School/Navigations/CoursesCreating/RedactorCourse/CoursePage/types/blocksControllerT";
import {appealStatT} from "../types/schoolsT";
import {UpdateCourses} from "./apiTypes";
import { baseQueryWithReauth } from './baseQueryReauth';

export const courseLandingServices = createApi({
  reducerPath: 'courseLandingServices',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['landing',],
  endpoints: build => ({
    fetchCourseLanding: build.mutation<BlockKeys, {schoolName: string, id: number}>({
      query: arg => ({
        url: `/${arg.schoolName}/course_landing/${arg.id}/`,
        method: 'GET',
      }),
    }),
    sendCourseLanding: build.mutation<BlockKeys, { id: number, schoolName: string, data: BlockKeys }>({
      query: arg => ({
        url: `/${arg.schoolName}/course_landing/${arg.id}/`,
        method: 'PATCH',
        body: arg.data,
      }),
    }),
    sendLandingImages: build.mutation<any, {arg: UpdateCourses, schoolName: string}>({
      query: ({arg, schoolName}) => {
        return {
          url: `/${schoolName}/course_landing/${arg?.id}/`,
          method: 'PATCH',
          body: arg?.formdata,
        }
      },
    }),
  }),
})

export const {
  useFetchCourseLandingMutation,
  useSendCourseLandingMutation,
  useSendLandingImagesMutation,
} = courseLandingServices
