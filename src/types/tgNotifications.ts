export interface TgNotificationsUpdateForStudentAndTeacher {
    homework_notifications?: Boolean;
    messages_notifications?: Boolean;
    tg_user: number
}

export interface TgNotificationsUpdateForAdmin {
    messages_notifications?: Boolean;
    completed_courses_notifications?: Boolean;
    tg_user: number
}

export interface TgNotifications {
    id: number;
    homework_notifications: Boolean;
    messages_notifications: Boolean;
    completed_courses_notifications: Boolean;
    tg_user: number;
}