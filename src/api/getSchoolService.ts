import { createApi } from '@reduxjs/toolkit/dist/query/react'

import {baseApiQuery, baseQuery} from './baseApi'
import { formDataConverter } from '../utils/formDataConverter'
import { ICredentials, IResponse } from './apiTypes'
import { ILoginUserInfo } from 'types/userT'

export const getSchoolService = createApi({
  reducerPath: 'getSchoolService',
  baseQuery: baseApiQuery,
  endpoints: builder => ({
    getSchools: builder.mutation<void, void>({
      query: () => {
        return {
          url: '/user-schools/',
          method: 'GET',
          redirect: 'follow',
          responseHandler: response => response.text(),
        }
      }
    })
  })
})
export const { useGetSchoolsMutation } = getSchoolService
