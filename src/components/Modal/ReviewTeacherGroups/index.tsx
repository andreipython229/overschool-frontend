import React, {ChangeEvent, FC, useState, useEffect} from 'react'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {crossIconPath} from 'config/commonSvgIconsPath'
import {Checkbox} from 'components/common/Checkbox/Checkbox'
import {Button} from 'components/common/Button/Button'
import { useFetchAllUsersQuery } from 'api/allUsersList'
import {useLazyFetchCoursesGroupsQuery} from "api/coursesServices";
import {SimpleLoader} from 'components/Loaders/SimpleLoader'

import styles from '../../Modal/Modal.module.scss'
import {EmployeeT} from "../../../types/userT";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {usePatchStudentsGroupMutation} from "../../../api/studentsGroupService";


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
    group_id: number
    available_teachers: EmployeeT[]
    new_teacher: EmployeeT | undefined
    changeType: boolean
    changeTeacher: boolean
}

export const ReviewTeacherGroups: FC<reviewTeacherGroupsT> = ({closeModal, name, email, id}) => {
    const schoolName = window.location.href.split('/')[4]
    // const {data: courses, isSuccess, isFetching} = useFetchCoursesGroupsQuery(schoolName)
    const [getCourses, {data: courses, isSuccess, isFetching}] = useLazyFetchCoursesGroupsQuery()
    const {data: allUsers, isSuccess: userSuccess} = useFetchAllUsersQuery({ schoolName: schoolName, role: 'staff', size: 100 })
    const [groups, setGroups] = useState<teacherGroupT[]>([])
    const [allTeachers, setAllTeachers] = useState<EmployeeT[]>([])
    const [isChangeMode, setIsChangeMode] = useState<boolean>(false)
    const [patchGroup] = usePatchStudentsGroupMutation()

    useEffect(() => {
      if (id) {
        getCourses(schoolName)
      }
    }, [id])

    useEffect(() => {
        if (isSuccess && courses) {
            const updatedCourses = courses.map(course => ({
                ...course,
                teacher_ids: course.student_groups.map(group => group.teacher_id),
                student_groups: course.student_groups.filter(group => (group.teacher_id === id))
            }))
            const teacherCourses = updatedCourses.filter(course => (course.student_groups.length !== 0)).map(course => ({
                ...course,
                available_teachers: allTeachers.filter((teacher: any) => {
                    return !new Set(course.teacher_ids).has(teacher.id)
                })
            }))

            setGroups(teacherCourses.map(course => ({
                course_id: course.course_id,
                course_name: course.name,
                name: course.student_groups[0].name,
                group_id: course.student_groups[0].group_id,
                available_teachers: course.available_teachers,
                new_teacher: undefined,
                changeType: false,
                changeTeacher: false
            })))
        }
    }, [courses, allTeachers])

    useEffect(() => {
      if (userSuccess) {
        const allTeachers = allUsers.results.filter((user: any) => user.role === 'Teacher')
        setAllTeachers(allTeachers)
      }
    }, [allUsers])

    const handleChangeTeacher = (course_id: number, e: DropdownChangeEvent) => {
      const selected_email = e.target.value
      setGroups((prevGroups: teacherGroupT[]) =>
        prevGroups.map((group: teacherGroupT) =>
          group.course_id === course_id
            ? {
                ...group,
                available_teachers: group.new_teacher
                    ? [...group.available_teachers.filter((teacher: EmployeeT) => teacher.email !== selected_email), group.new_teacher]
                    : [...group.available_teachers.filter((teacher: EmployeeT) => teacher.email !== selected_email)],
                new_teacher: allTeachers.find((teacher: EmployeeT) => teacher.email === selected_email)
              }
            : group,
        ),
      )
    }

    const handleTypeCheck = (course_id: number) => {
      setGroups((prevGroups: teacherGroupT[]) =>
        prevGroups.map((group: teacherGroupT) =>
          group.course_id === course_id
            ? {
                ...group,
                changeType: !group.changeTeacher ? !group.changeType : group.changeType
              }
            : group,
        ),
      )
    }

    const handleTeacherCheck = (course_id: number) => {
      setGroups((prevGroups: teacherGroupT[]) =>
        prevGroups.map((group: teacherGroupT) =>
          group.course_id === course_id
            ? {
                ...group,
                changeTeacher: !group.changeType ? !group.changeTeacher : group.changeTeacher
              }
            : group,
        ),
      )
    }

    const handleSaveChanges = () => {
        groups.map(async (group: teacherGroupT) => {
            const dataToSend = {course_id: group.course_id};
            if (group.changeTeacher && group.new_teacher?.id) {
                Object.assign(dataToSend, { teacher_id: group.new_teacher.id })
            } else if (group.changeType) {
                Object.assign(dataToSend, { type: 'WITHOUT_TEACHER' })
            }

            if (Object.hasOwn(dataToSend, "teacher_id") || Object.hasOwn(dataToSend,"type")) {
                await patchGroup({
                    id: group.group_id,
                    data: dataToSend,
                    schoolName: schoolName,
                })
                    .unwrap()
                    .catch(error => console.log(error.data))
            }
        })
    }

    return (
        <div /*onSubmit={handleCreatEmployee}*/ className={styles.main_employee}>
            {isFetching && (
                <div className={styles.loader}>
                    <SimpleLoader style={{width: '50px', height: '50px'}}/>
                </div>
            )}
            <div className={styles.main_employee_container}>
                <div className={styles.main_employee_closedModal} onClick={closeModal}>
                    <IconSvg width={20} height={20} viewBoxSize="0 0 14 14" path={crossIconPath}/>
                </div>
                <div className={styles.main_employee_info}>
                    <h3 className={styles.main_employee_name}>{name}</h3>
                    <span className={styles.main_employee_email}>Email: {email}</span>
                </div>
                <div className={styles.main_employee_course}>
                    {groups?.length !== 0 ? <>
                            <span className={styles.main_employee_course_title} style={{marginBottom: 12}}>Группы ментора:</span>
                                 {groups?.map(({ course_id, course_name, name, available_teachers,
                                                      new_teacher, changeType, changeTeacher }: teacherGroupT) => (
                                    <>
                            <table style={{ marginBottom: '10px' }}>
                                <tbody>
                                    <tr key={course_id}>
                                        <td><b>Курс:</b> {course_name}</td>
                                        <td><b>Группа:</b> {name}</td>
                                    </tr>
                                </tbody>
                            </table>
                                {isChangeMode &&
                                    <div className={styles.main_employee_change}>
                                      <div className={styles.main_employee_change_checkbox}>
                                        <Checkbox id={'type'} name={'type'} checked={changeType} onChange={() => handleTypeCheck(course_id)}/>
                                        <span style={changeTeacher ? { color: '#e5e7eb' } : {}}>Установить тип группы без ментора</span>
                                      </div>
                                      <div className={styles.main_employee_change_checkbox}>
                                        <Checkbox id={'teacher'} name={'teacher'} checked={changeTeacher} onChange={() => handleTeacherCheck(course_id)}/>
                                        <span style={changeType ? { color: '#e5e7eb' } : {}}>Заменить ментора</span>
                                      </div>
                                      {changeTeacher &&
                                        <Dropdown value={new_teacher?.email} onChange={(e) => handleChangeTeacher(course_id, e)}
                                                options={available_teachers.map((teacher: EmployeeT) => teacher.email)}
                                                placeholder={`${new_teacher ? new_teacher.email : 'Выберите нового ментора'}`}
                                                 style={{ marginLeft: 40 }}
                                        />}
                                    </div>}
                                    </>))}
                            {!isChangeMode
                              ? <Button
                                onClick={() => setIsChangeMode(true)}
                                text={'Замена ментора или типа групп'}
                                variant={'newPrimary'}
                                className={styles.main_employee_change_button}
                                />
                              : <Button
                                type="submit"
                                onClick={handleSaveChanges}
                                text={'Сохранить'}
                                variant={'newPrimary'}
                                className={styles.main_employee_change_button}
                                />}
                            </>
                        : <span className={styles.main_employee_course_title}>У ментора нет групп</span>
                    }
                </div>
            </div>
        </div>
    )
}
