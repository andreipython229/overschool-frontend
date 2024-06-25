import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQuery } from './baseApi'
import { formDataConverter } from '../utils/formDataConverter'
import { baseQueryWithReauth } from './baseQueryReauth'

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
  tagTypes: ['questions', 'answers', 'usertests'],
  endpoints: build => ({
    fetchQuestionsList: build.query<any, {id: string | number, schoolName: string}>({
      query: ({ id, schoolName }) => ({
        url: `/${schoolName}/tests/${id}/get_questions/`,
      }),
      providesTags: ['questions', 'answers'],
    }),
    // fetchQuestions: build.query({
    //   query: () => ({
    //     url: `/questions/`,
    //   }),
    //   providesTags: ['questions'],
    // }),

    createQuestions: build.mutation<any, { question: any; schoolName: string }>({
      query: ({ question, schoolName }) => {
        return {
          url: `/${schoolName}/questions/`,
          method: 'POST',
          body: question,
        }
      },
      invalidatesTags: ['questions'],
    }),
    patchQuestion: build.mutation<any, { titleQuestion: string; id: string | number; testId: string | number; schoolName: string }>({
      query: ({ titleQuestion, id, testId, schoolName }) => {
        const formdata = formDataConverter({ body: titleQuestion, test: testId })
        return {
          url: `/${schoolName}/questions/${id}/`,
          method: 'PATCH',
          body: formdata,
        }
      },
      invalidatesTags: ['questions'],
    }),
    removeQuestions: build.mutation<any, { id: string | number; schoolName: string }>({
      query: ({ id, schoolName }) => {
        return {
          url: `/${schoolName}/questions/${id}/`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['questions'],
    }),
    addAnswer: build.mutation<any, { body: any; schoolName: string }>({
      query: ({ body, schoolName }) => {
        return {
          url: `/${schoolName}/answers/`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['answers'],
    }),
    patchAnswer: build.mutation<any, {answer: any, answerId: string | number, schoolName: string}>({
      query: ({ answer, answerId, schoolName }) => {
        return {
          url: `/${schoolName}/answers/${answerId}/`,
          method: 'PATCH',
          body: answer,
        }
      },
      // invalidatesTags: [''],
    }),
    deleteAnswer: build.mutation<any, {answerId: string | number, schoolName: string}>({
      query: ({ answerId, schoolName }) => {
        return {
          url: `/${schoolName}/answers/${answerId}/`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['answers'],
    }),
    getUserTestsByTest: build.mutation<any, {id: string | number, schoolName: string}>({
      query: ({ id, schoolName }) => {
        return {
          url: `/${schoolName}/tests/${id}/usertests/`,
        }
      },
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
  useGetUserTestsByTestMutation,
} = questionsAndAnswersService
