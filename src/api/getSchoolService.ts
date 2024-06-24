import { createApi } from '@reduxjs/toolkit/dist/query/react'
import {baseQuery} from "./baseApi";
import { SchoolT } from 'Pages/ChooseSchool/ChooseSchool';
import { baseQueryWithReauth } from './reauthBaseQuery';

export const getSchoolService = createApi({
  reducerPath: 'getSchoolService',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getSchools: builder.mutation<SchoolT[], void>({
      query: () => {
        return {
          url: '/user-schools/',
          method: 'GET',
          redirect: 'follow',
        }
      },
    }),
  }),
})
export const { useGetSchoolsMutation } = getSchoolService
