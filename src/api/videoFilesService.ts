import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryFn } from './baseApi'

export const videoFilesService = createApi({
  reducerPath: 'videoFilesService',
  baseQuery: baseQueryFn('/video/'),
  tagTypes: ['lessons', 'videoFiles', 'patchLessons', 'uploadLessonVideo'],
  endpoints: build => ({
    uploadLessonVideo: build.mutation<void, { id: number; type: string; formdata: FormData }>({
      query: arg => {
        return {
          url: `/${arg.type}_video/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['uploadLessonVideo', 'patchLessons'],
    }),
  }),
})

export const { useUploadLessonVideoMutation } = videoFilesService
