import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'

export const videoFilesService = createApi({
  reducerPath: 'videoFilesService',
  baseQuery: baseQuery(),
  tagTypes: ['lessons', 'videoFiles', 'patchLessons', 'uploadLessonVideo'],
  endpoints: build => ({
    uploadLessonVideo: build.mutation<void, { arg: { id: number; type: string; formdata: FormData }; schoolName: string }>({
      query: ({ arg, schoolName }) => {
        return {
          url: `/${schoolName}/${arg.type}s/${arg.id}/`,
          method: 'PATCH',
          body: arg.formdata,
        }
      },
      invalidatesTags: ['uploadLessonVideo', 'patchLessons'],
    }),
  }),
})

export const { useUploadLessonVideoMutation } = videoFilesService
