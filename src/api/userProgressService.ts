import { createApi } from '@reduxjs/toolkit/dist/query/react'
import {baseQueryFn} from './baseApi'
import axios from "axios";

export const userProgressService = createApi({
    reducerPath: 'userProgressService',
    baseQuery: baseQueryFn(),
    tagTypes: ['userProgress', 'progress'],
    endpoints: build => ({
        fetchProgress: build.query({
            query: (course_id: number | string) => `/student_progress/get_student_progress_for_student/?course_id=${course_id}`,
                }),
        fetchStudentProgress: build.query({
            query: (user_id: number | string) => `/student_progress/get_student_progress_for_admin_or_teacher/?student_id=${user_id}`
        })
        }),
});

export const { useFetchProgressQuery, useFetchStudentProgressQuery } = userProgressService;