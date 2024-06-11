import {createApi} from '@reduxjs/toolkit/dist/query/react'
import {baseQuery} from './baseApi'
import {TgNotificationsUpdateForAdmin, TgNotificationsUpdateForStudentAndTeacher, TgNotifications} from "../types/tgNotifications";

export const tgNotificationsService = createApi({
    reducerPath: 'tgNotificationsService',
    baseQuery: baseQuery(),
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
    }),
});

export const {
    useFetchNotificationsQuery,
    useUpdateNotificationsForStudentAndTeacherMutation,
    useUpdateNotificationsForAdminMutation
} = tgNotificationsService;