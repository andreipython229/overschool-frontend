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

export interface TgMessage {
    message: string;
    students_groups: number[];
}

export interface TgMeetingReminders {
    daily?: boolean;
    in_three_hours?: boolean;
    ten_minute?: boolean;
    sent?: boolean
    meeting: number
}