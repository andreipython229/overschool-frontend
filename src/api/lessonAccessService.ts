import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

import {groupSections, studentSectionsPerGroupsT} from '../types/lessonAccessT'
import {baseQuery} from "./baseApi";

export const lessonAccessService = createApi({
    reducerPath: 'lessonAccessService',
    baseQuery: baseQuery(),
    tagTypes: ['studentSectionsPerGroup', 'groupSections'],
    endpoints: build => ({
        fetchStudentLessons: build.query<studentSectionsPerGroupsT, { id: string | number; student_id: number }>({
            query: ({id, student_id}) => ({
                url: `schools/${id}/section_student/?student_id=${student_id}`,
            }),
            providesTags: ['studentSectionsPerGroup'],
        }),
        setStudentLessonsAccess: build.mutation<any, { data: any; schoolName: string }>({
            query: ({data, schoolName}) => ({
                url: `/${schoolName}/lesson-availability/`,
                method: 'POST',
                body: data,
            }),
        }),
        fetchGroupLessons: build.query<groupSections, { group_id: number; schoolName: string }>({
            query: ({group_id, schoolName}) => ({
                url: `/${schoolName}/students_group/${group_id}/section_student_group`,
            }),
            providesTags: ['groupSections'],
        }),
        setGroupLessonsAccess: build.mutation<any, { data: any; schoolName: string }>({
            query: ({data, schoolName}) => ({
                url: `/${schoolName}/lesson-enrollment/`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const {
    useLazyFetchStudentLessonsQuery,
    useSetStudentLessonsAccessMutation,
    useLazyFetchGroupLessonsQuery,
    useSetGroupLessonsAccessMutation
} = lessonAccessService