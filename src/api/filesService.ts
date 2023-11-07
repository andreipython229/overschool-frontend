import { createApi } from '@reduxjs/toolkit/dist/query/react'

import {baseQuery, baseQueryFn} from './baseApi'

export const filesService = createApi({
  reducerPath: 'filesService',
  baseQuery: baseQueryFn(),
  tagTypes: ['audioFiles', 'textFiles'],
  endpoints: build => ({
    postAudioFiles: build.mutation<void, FormData>({
      query: formData => ({
        url: `/audio_files/`,
        method: 'POST',
        body: formData,
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
    deleteTextFiles: build.mutation<any, any>({
      query: id => ({
        url: `/text_files/${id}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['textFiles']
    })
  }),
})

export const { usePostTextFilesMutation, usePostAudioFilesMutation, useDeleteTextFilesMutation } = filesService
