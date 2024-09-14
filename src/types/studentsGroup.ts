import {b} from "msw/lib/glossary-dc3fd077";
import {sectionLessons} from "./lessonAccessT";

export type studentsGroupT = {
    next?: null
    previous?: null
    count?: number
    results: studentsGroupsT[]
}

export type studentsGroupsT = {
    group_id?: number
    created_at?: Date
    updated_at?: Date
    name: string
    course_id?: number
    course_name?: string
    teacher_id?: number
    students: number[]
    group_settings?: {
        strict_task_order: boolean,
        task_submission_lock: boolean
        submit_homework_to_go_on: boolean
        submit_test_to_go_on: boolean
        success_test_to_go_on: boolean
        download: boolean
        overai_lock: boolean
    }
    type?: string
    training_duration: number
    certificate: boolean
}

export type studentsTableHeader = {
    admin: number
    students_table_info_id: number
    students_table_info: studentGroupInfoT[]
    type: string
}

export type studentGroupInfoT = {
    order: number
    name: string
    checked: boolean
    label?: string
    id: number
}


export type schoolStudentsGroupingData = {
    id: number;
    school: number;
    is_students_grouped: boolean;
}

export type groupCourseAccessT = {
    current_group: number;
    group: number;
    course: number;
}