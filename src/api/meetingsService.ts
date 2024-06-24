import {createApi} from '@reduxjs/toolkit/dist/query/react'
import {baseQuery} from './baseApi'
import {SchoolUpdateMeeting, SchoolMeeting} from "../types/schoolMeetingsT";
import { baseQueryWithReauth } from './reauthBaseQuery';

export const meetingService = createApi({
    reducerPath: 'meetingService',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['meeting'],
    endpoints: build => ({
        fetchMeeting: build.query<SchoolMeeting, { id: number; schoolName: string }>({
            query: ({id, schoolName}) => ({
                url: `/${schoolName}/school_meetings/${id}/`,
            }),
            providesTags: ['meeting'],
        }),
        fetchAllMeetings: build.query<SchoolMeeting[], { schoolName: string }>({
            query: ({schoolName}) => ({
                url: `/${schoolName}/school_meetings/`,
            }),
            providesTags: ['meeting'],
        }),
        createMeeting: build.mutation<SchoolMeeting, { data: SchoolMeeting; schoolName: string }>({
            query: ({data, schoolName}) => ({
                url: `/${schoolName}/school_meetings/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['meeting'],
        }),
        updateMeeting: build.mutation<SchoolMeeting, { id: number; data: SchoolUpdateMeeting; schoolName: string }>({
            query: ({id, data, schoolName}) => ({
                url: `/${schoolName}/school_meetings/${id}/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['meeting'],
        }),
        deleteMeeting: build.mutation<void, { id: number; schoolName: string }>({
            query: ({ id, schoolName }) => ({
                url: `/${schoolName}/school_meetings/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['meeting'],
        }),
    }),
});

export const {
    useFetchMeetingQuery,
    useFetchAllMeetingsQuery,
    useCreateMeetingMutation,
    useUpdateMeetingMutation,
    useDeleteMeetingMutation,
} = meetingService;