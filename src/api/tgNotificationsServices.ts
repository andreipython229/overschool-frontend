import {createApi} from '@reduxjs/toolkit/dist/query/react'
import {baseQuery} from './baseApi'
import {TgNotificationsUpdateForAdmin, TgNotificationsUpdateForStudentAndTeacher, TgNotifications, TgMessage, TgMeetingReminders} from "../types/tgNotifications";
import { baseQueryWithReauth } from './baseQueryReauth';

export const tgNotificationsService = createApi({
    reducerPath: 'tgNotificationsService',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['tgNotifications'],
    endpoints: build => ({
        fetchNotifications: build.query<TgNotifications[], void>({
            query: () => ({
                url: `/tg_notification/tg_notif/`,
            }),
            providesTags: ['tgNotifications'],
        }),

        updateNotificationsForStudentAndTeacher: build.mutation<TgNotifications, { id: number; data: TgNotificationsUpdateForStudentAndTeacher}>({
            query: ({id, data}) => ({
                url: `/tg_notification/tg_notif/${id}/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['tgNotifications'],
        }),
        updateNotificationsForAdmin: build.mutation<TgNotifications, { id: number; data: TgNotificationsUpdateForAdmin}>({
            query: ({id, data}) => ({
                url: `/tg_notification/tg_notif/${id}/`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['tgNotifications'],
        }),
        updateTgMessage: build.mutation<TgMessage, {data: TgMessage}>({
            query: ({data}) => ({
                url: `/tg_notification/tg_messages/send-message/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['tgNotifications'],
        }),
        createMeetingsReminders: build.mutation<TgMeetingReminders, {data: TgMeetingReminders}>({
            query: ({data}) => ({
                url: `/tg_notification/reminders/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['tgNotifications'],
        }),
        // deleteMeetingsReminders: build.mutation<void, {meeting_id: number}>({
        //     query: ({meeting_id}) => ({
        //         url: `/tg_notification/reminders/delete-by-secondary-key/${meeting_id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['tgNotifications'],
        // }),
        
    }),
});

export const {
    useFetchNotificationsQuery,
    useUpdateNotificationsForStudentAndTeacherMutation,
    useUpdateNotificationsForAdminMutation,
    useUpdateTgMessageMutation,
    useCreateMeetingsRemindersMutation,
    // useDeleteMeetingsRemindersMutation,
} = tgNotificationsService;