import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'

export const filesService = createApi({
  reducerPath: 'filesService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['audioFiles', 'textFiles'],
  endpoints: build => ({
    fetchAudioFiles: build.query<any, void>({
      query: () => ({
        url: `audio_files/`,
      }),
      providesTags: ['audioFiles'],
    }),
    fetchTextFiles: build.query<any, void>({
      query: () => ({
        url: `text_files/`,
      }),
      providesTags: ['textFiles'],
    }),
    postAudioFiles: build.mutation<any, any>({
      query: arg => ({
        url: `audio_files/`,
        method: 'POST',
        body: arg,
      }),
      invalidatesTags: ['audioFiles'],
    }),
    postTextFiles: build.mutation<any, any>({
      query: formData => ({
        url: `text_files/`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['textFiles'],
    }),
    patchAudioFiles: build.mutation<any, any>({
      query: ({ arg, baseLessonId }) => ({
        url: `audio_files/${baseLessonId}/`,
        method: 'PATCH',
        body: arg,
      }),
      invalidatesTags: ['audioFiles'],
    }),
    patchTextFiles: build.mutation<any, any>({
      query: ({ formData, baseLessonId }) => ({
        url: `text_files/${baseLessonId}/`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['textFiles'],
    }),
  }),
})

export const {
  useFetchAudioFilesQuery,
  useFetchTextFilesQuery,
  usePatchTextFilesMutation,
  usePatchAudioFilesMutation,
  usePostTextFilesMutation,
  usePostAudioFilesMutation,
} = filesService
