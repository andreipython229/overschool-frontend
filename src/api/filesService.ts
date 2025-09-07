import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { baseQueryWithReauth } from './baseQueryReauth'

export const filesService = createApi({
  reducerPath: 'filesService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['audioFiles', 'textFiles'],
  endpoints: build => ({
    postAudioFiles: build.mutation<void, { formData: FormData; schoolName: string }>({
      query: ({ formData, schoolName }) => ({
        url: `/${schoolName}/audio_files/`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['audioFiles'],
    }),
    deleteAudioFiles: build.mutation<any, { id: string | number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/audio_files/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['audioFiles'],
    }),
    postTextFiles: build.mutation<void, { formData: FormData; schoolName: string }>({
      query: ({ formData, schoolName }) => ({
        url: `/${schoolName}/text_files/`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['textFiles'],
    }),
    deleteTextFiles: build.mutation<any, { id: string | number; schoolName: string }>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/text_files/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['textFiles'],
    }),
  }),
})

export const { usePostTextFilesMutation, usePostAudioFilesMutation, useDeleteTextFilesMutation, useDeleteAudioFilesMutation } = filesService
