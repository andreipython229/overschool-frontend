import {ChangeEvent, FC, useState, useEffect} from 'react'

import {checkCoursesDataT, checkCourseT} from 'types/CoursesT'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {crossIconPath} from 'config/commonSvgIconsPath'
import {Checkbox} from 'components/common/Checkbox/Checkbox'
import {Button} from 'components/common/Button/Button'
import {useFetchCoursesGroupsQuery} from "api/coursesServices";
import {SimpleLoader} from 'components/Loaders/SimpleLoader'

import styles from '../../Modal/Modal.module.scss'
import {EmployeeT} from "../../../types/userT";


type reviewTeacherGroupsT = {
    closeModal: () => void
    name: string
    email: string
    id?: number
}

type teacherGroupT = {
    course_id: number
    course_name: string
    name: string
}

export const ReviewTeacherGroups: FC<reviewTeacherGroupsT> = ({closeModal, name, email, id}) => {
    const schoolName = window.location.href.split('/')[4]
    const {data: courses, isSuccess, isFetching} = useFetchCoursesGroupsQuery(schoolName)
    const [groups, setGroups] = useState<teacherGroupT[]>()


    useEffect(() => {
        if (isSuccess) {
            const updatedCourses = courses.map(course => ({
                ...course,
                student_groups: course.student_groups.filter(group => (group.teacher_id === id))
            }))
            const teacherCourses = updatedCourses.filter(course => (course.student_groups.length !== 0))
            setGroups(teacherCourses.map(course => ({
                course_id: course.course_id,
                course_name: course.name,
                name: course.student_groups[0].name
            })))
        }
    }, [courses])

    return (
        <form /*onSubmit={handleCreatEmployee}*/ className={styles.main_employee}>
            {isFetching && (
                <div className={styles.loader}>
                    <SimpleLoader style={{width: '50px', height: '50px'}}/>
                </div>
            )}
            <div className={styles.main_employee_container}>
                <div className={styles.main_employee_closedModal} onClick={closeModal}>
                    <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath}/>
                </div>
                <div className={styles.main_employee_info}>
                    <h3 className={styles.main_employee_name}>{name}</h3>
                    <span className={styles.main_employee_email}>Email: {email}</span>
                </div>
                <div className={styles.main_employee_course}>
                    {groups?.length !== 0 ? <>
                            <span className={styles.main_employee_course_title} style={{marginBottom: 15}}>Группы ментора:</span>
                            {groups?.map(({course_id, course_name, name}: teacherGroupT) => (
                                <p key={course_id}><span
                                    className={styles.main_employee_course_title}>курс... </span> {course_name}
                                    <span className={styles.main_employee_course_title}>  ...группа... </span> {name}
                                </p>
                            ))} </>
                        : <span className={styles.main_employee_course_title}>У ментора групп нет</span>
                    }
                </div>

            </div>
        </form>
    )
}
