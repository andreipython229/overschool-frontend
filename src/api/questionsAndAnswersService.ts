import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from './baseApi'

type returnQuestionT = {
  body: string
  created_at: Date | string
  is_any_answer_correct: boolean
  only_whole_numbers: boolean
  picture: null | string
  question_id: number | string
  question_type: string
  test: number | string
  updated_at: Date | string
}

export const questionsAndAnswersService = createApi({
  reducerPath: 'questionsAndAnswersService',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['questions'],
  endpoints: build => ({
    fetchQuestionsList: build.query({
      query: id => ({
        url: `/tests/${id}/get_questions/`,
      }),
      providesTags: ['questions'],
    }),
    // fetchQuestions: build.query({
    //   query: () => ({
    //     url: `/questions/`,
    //   }),
    //   providesTags: ['questions'],
    // }),

    createQuestions: build.mutation({
      query: question => {
        return {
          url: `/questions/`,
          method: 'POST',
          body: question,
        }
      },
      invalidatesTags: ['questions'],
    }),
    patchQuestions: build.mutation({
      query: questions => {
        return {
          url: `/questions/`,
          method: 'PATCH',
          body: questions,
        }
      },
      // invalidatesTags: [''],
    }),
    removeQuestions: build.mutation({
      query: id => {
        return {
          url: `/questions/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['questions'],
    }),
    patchAnswers: build.mutation({
      query: answer => {
        return {
          url: `/answers/`,
          method: 'PATCH',
          body: answer,
        }
      },
      // invalidatesTags: [''],
    }),
  }),
})

export const { useFetchQuestionsListQuery, useCreateQuestionsMutation, useRemoveQuestionsMutation } = questionsAndAnswersService
