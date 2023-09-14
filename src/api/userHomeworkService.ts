import {createApi} from '@reduxjs/toolkit/dist/query/react'
import {UserHomework, Homework} from 'types/homeworkT'
import {baseQueryFn} from './baseApi'

interface CheckReply {
    user_homework_check_id: number,
    user_homework_id: number,
    mark: number,
    text: string,
    status: string,
    author: number
    created_at: string
    updated_at: string
}

export const userHomeworkService = createApi({
    reducerPath: 'userHomeworkService',
    baseQuery: baseQueryFn(),
    tagTypes: ['userHomework'],
    endpoints: build => ({
        fetchUserHomework: build.query<UserHomework, number>({
            query: id => ({
                url: `/user_homeworks/${id}/`,
            }),
            providesTags: ['userHomework'],
        }),
        fetchHomeworkData: build.query<Homework, number>({
            query: id => ({
                url: `/homeworks/${id}/`,
            }),
            providesTags: ['userHomework'],
        }),
        fetchTeacherHomework: build.query<any, number>({
            query: id => ({
                url: `/teacher_homeworks/${id}/`,
            }),
            providesTags: ['userHomework'],
        }),
        postUserHomework: build.mutation<CheckReply, any>({
            query: homework => {
                return {
                    url: `/user_homeworks/`,
                    method: 'POST',
                    body: homework,
                }
            },
            invalidatesTags: ['userHomework'],
        }),
        patchUserHomework: build.mutation<void, any>({
            query: homework => {
                return {
                    url: `/user_homeworks/`,
                    method: 'PATCH',
                    body: homework,
                }
            },
            invalidatesTags: ['userHomework'],
        }),
        createCheckReply: build.mutation<CheckReply, any>({
            query: data => {
                return {
                    url: `/user_homework_checks/`,
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['userHomework'],
        }),
    }),
})

export const {
    useFetchUserHomeworkQuery,
    useFetchTeacherHomeworkQuery,
    usePostUserHomeworkMutation,
    useFetchHomeworkDataQuery,
    useCreateCheckReplyMutation,
} = userHomeworkService
