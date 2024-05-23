export interface TgNotificationsUpdateForStidentAndTeacher {
    homework_notifications: Boolean;
    messages_notifications: Boolean;
}

export interface TgNotificationsUpdateForAdmin {
    messages_notifications: Boolean;
    completed_courses_notifications: Boolean;
}

export interface TgNotifications {
    id: number;
    homework_notifications: Boolean;
    messages_notifications: Boolean;
    completed_courses_notifications: Boolean;
    tg_user: number;
}