export interface SchoolMeeting {
    id: number;
    students_groups: number[];
    link: string;
    start_date: Date;
    title: string;
    description: string;
}

export interface SchoolUpdateMeeting {
    students_groups: number[];
    link: string;
    start_date: Date;
}

export interface SchoolMeetingsApiResponse {
    meetings: SchoolMeeting[];
}

export interface SchoolMeetingApiResponse {
    meeting: SchoolMeeting;
}
