import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { baseQuery } from './baseApi'
import {individualRatingT, ratingPaginatorT} from '../types/ratingT'
import { baseQueryWithReauth } from './baseQueryReauth';

export const ratingService = createApi({
    reducerPath: 'ratingService',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['studentRating'],
    endpoints: build => ({
        fetchIndividualRating: build.query<individualRatingT, { schoolName: string }>({
            query: ({ schoolName }) => ({
                url: `/${schoolName}/student_rating/individual_rating`,
            }),
            providesTags: ['studentRating'],
        }),
        fetchAllStudentRating: build.query<ratingPaginatorT, { schoolName: string; lessonsFlag: boolean; coursesFlag: boolean; page: number|undefined; size: number|undefined }>({
            query: ({ schoolName, lessonsFlag, coursesFlag, page, size }) => ({
                url: `/${schoolName}/student_rating/all_rating?lessons_flag=${lessonsFlag}&courses_flag=${coursesFlag}&?p=${page !== undefined ? page : 1}&s=${size !== undefined ? size : 30}`,
            }),
            providesTags: ['studentRating'],
        }),
    }),
})

export const {
    useFetchIndividualRatingQuery,
    useFetchAllStudentRatingQuery
} = ratingService