import { createApi } from '@reduxjs/toolkit/dist/query/react'
import {baseQuery, baseQueryFn} from './baseApi'

export const userProgressService = createApi({
    reducerPath: 'userProgressService',
    baseQuery: baseQueryFn(),
    tagTypes: ['userProgress', 'progress'],
    endpoints: build => ({
        fetchProgress: build.query({
            query: (course_id: number | string) => `/student_progress/get_student_progress_for_student/?course_id=${course_id}`,
                })
        }),
});

export const { useFetchProgressQuery } = userProgressService;