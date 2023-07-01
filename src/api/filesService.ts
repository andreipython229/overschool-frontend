import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'

export const filesService = createApi({
  reducerPath: 'filesService',
  baseQuery: baseQuery,
  tagTypes: ['audioFiles', 'textFiles'],
  endpoints: build => ({
    postAudioFiles: build.mutation<void, FormData>({
      query: body => ({
        url: `/audio_files/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['audioFiles'],
    }),
    postTextFiles: build.mutation<void, FormData>({
      query: formData => ({
        url: `/text_files/`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['textFiles'],
    }),
  }),
})

export const { usePostTextFilesMutation, usePostAudioFilesMutation } = filesService
