import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import { RootState } from 'store/redux/store'

export const videoFilesService = createApi({
  reducerPath: 'videoFilesService',
  baseQuery: fetchBaseQuery({
    baseUrl: '/video/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      console.log((getState() as RootState).user.authState)
      const token = (getState() as RootState).user.authState.access
      if (token && token !== '') {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['lessons', 'videoFiles', 'patchLessons', 'uploadLessonVideo'],
  endpoints: build => ({
    uploadLessonVideo: build.mutation<any, { arg: { id: number; formdata: FormData }; schoolName: string }>({
      query: ({ arg, schoolName }) => {
        return {
          url: `/${schoolName}/block_video/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['uploadLessonVideo', 'patchLessons'],
    }),
  }),
})

export const { useUploadLessonVideoMutation } = videoFilesService
