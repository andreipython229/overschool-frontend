export type studentSectionsPerGroupsT = {
    student_id: number;
    student_data: groupSections[];
}

export type groupSections = {
    group_id: number;
    sections: sectionLessons[];
}

export interface sectionLessons {
    section_id: number
    name: string
    lessons: lessonAccess[]
}

export interface lessonAccess {
    lesson_id: number
    name: string
    order: number
    type: string
    active: boolean
    availability: boolean
    status: string
    mark: number
}

export type durationStudent = {
    final_limit: number
    individual_limit: number
}