import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { IFile } from 'types/filesT'
import { baseQueryWithReauth } from './baseApi'

type postFileT = {
  body: {
    body: string
    question: number
  }
}

type patchFileT = {
  body: FormData
  baseLessonId: number
}

export const filesService = createApi({
  reducerPath: 'filesService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['audioFiles', 'textFiles'],
  endpoints: build => ({
    fetchAudioFiles: build.query<IFile[], void>({
      query: () => ({
        url: `audio_files/`,
      }),
      providesTags: ['audioFiles'],
    }),
    fetchTextFiles: build.query<IFile[], void>({
      query: () => ({
        url: `text_files/`,
      }),
      providesTags: ['textFiles'],
    }),
    postAudioFiles: build.mutation<void, postFileT>({
      query: body => ({
        url: `audio_files/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['audioFiles'],
    }),
    postTextFiles: build.mutation<void, FormData>({
      query: formData => ({
        url: `text_files/`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['textFiles'],
    }),
    patchAudioFiles: build.mutation<void, patchFileT>({
      query: ({ body, baseLessonId }) => ({
        url: `audio_files/${baseLessonId}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['audioFiles'],
    }),
    patchTextFiles: build.mutation<void, patchFileT>({
      query: ({ body, baseLessonId }) => ({
        url: `text_files/${baseLessonId}/`,
        method: 'PATCH',
        body,
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
