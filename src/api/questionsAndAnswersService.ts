import { createApi } from '@reduxjs/toolkit/dist/query/react'

import {baseQuery, baseQueryFn} from './baseApi'
import { formDataConverter } from '../utils/formDataConverter'

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
  baseQuery: baseQueryFn(),
  tagTypes: ['questions', 'answers'],
  endpoints: build => ({
    fetchQuestionsList: build.query({
      query: id => ({
        url: `/tests/${id}/get_questions/`,
      }),
      providesTags: ['questions', 'answers'],
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
    patchQuestion: build.mutation({
      query: ({ titleQuestion, id }) => {
        const formdata = formDataConverter({ body: titleQuestion })
        return {
          url: `/questions/${id}/`,
          method: 'PATCH',
          body: formdata,
        }
      },
      invalidatesTags: ['questions'],
    }),
    removeQuestions: build.mutation({
      query: id => {
        return {
          url: `/questions/${id}/`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['questions'],
    }),
    addAnswer: build.mutation({
      query: body => {
        return {
          url: `/answers/`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['answers'],
    }),
    patchAnswer: build.mutation({
      query: ({ answer, answerId }) => {
        return {
          url: `/answers/${answerId}/`,
          method: 'PATCH',
          body: answer,
        }
      },
      // invalidatesTags: [''],
    }),
    deleteAnswer: build.mutation({
      query: answerId => {
        return {
          url: `/answers/${answerId}/`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['answers'],
    }),
  }),
})

export const {
  useFetchQuestionsListQuery,
  usePatchQuestionMutation,
  useCreateQuestionsMutation,
  useRemoveQuestionsMutation,
  useAddAnswerMutation,
  usePatchAnswerMutation,
  useDeleteAnswerMutation,
} = questionsAndAnswersService
