export interface TgNotificationsUpdateForStudentAndTeacher {
    homework_notifications?: boolean;
    messages_notifications?: boolean;
    tg_user: number;
}

export interface TgNotificationsUpdateForAdmin {
    messages_notifications?: boolean;
    completed_courses_notifications?: boolean;
    tg_user: number;
}

export interface TgNotifications {
    id: number;
    homework_notifications: boolean;
    messages_notifications: boolean;
    completed_courses_notifications: boolean;
    tg_user: number;
}

export interface TgMessage {
    message: string;
    students_groups: number[];
    tg_chats_ids?: number[];
    send_to_admins?: boolean;
}

export interface TgMeetingReminders {
    daily?: boolean;
    in_three_hours?: boolean;
    ten_minute?: boolean;
    sent?: boolean;
    meeting: number;
}

export interface TgMessageResponse {
    tg_chats_ids: number[];
    success: boolean;
    error?: string;
}

export interface TgMessageRequest {
    data: TgMessage;
}

export interface TgMessageState {
    isSending: boolean;
    progress: number;
    error: boolean;
    success: boolean;
    logs: string[];
}

export interface TgMessageResult {
    success: boolean;
    error?: string;
    tg_chats_ids?: number[];
}