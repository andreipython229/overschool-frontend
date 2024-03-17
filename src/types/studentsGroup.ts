import {b} from "msw/lib/glossary-dc3fd077";

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
    teacher_id?: number
    students: number[]
    group_settings?: {
        strict_task_order: boolean,
        task_submission_lock: boolean
        overai_lock: boolean
    }
    type?: string
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
