import {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react'
import Select from 'react-select'

import {Input} from 'components/common/Input/Input/Input'
import {Button} from 'components/common/Button/Button'
import {IconSvg} from '../../../common/IconSvg/IconSvg'
import {crossIconPath} from '../../../../config/commonSvgIconsPath'
import {createGroupIconPath} from '../config/svgIconsPath'
import {useCreateStudentsGroupMutation, useFetchStudentsGroupQuery} from '../../../../api/studentsGroupService'
import {CreateGroupModalPropsT} from '../../ModalTypes'
import {SimpleLoader} from 'components/Loaders/SimpleLoader'
import {useFetchAllUsersQuery} from '../../../../api/allUsersList'
import styles from '../studentsLog.module.scss'
import {checkCourseT} from "../../../../types/CoursesT";


export const CreateGroupModal: FC<CreateGroupModalPropsT> = ({setShowModal, courseId}) => {
    const [groupName, setGroupName] = useState<string>('')
    const [teacher_id, setTeacherId] = useState<string>('')
    const [studentsList, setStudentsList] = useState<any>([])
    const {data: userList} = useFetchAllUsersQuery()
    const [allStudents, setAllStudents] = useState<any>([])
    const [studentsWithoutGroup, setStudentsWithoutGroup] = useState<any>([])
    const [allTeachers, setAllTeachers] = useState<any>([])
    const [teachers, setTeachers] = useState<any>([])
    const {data: allGroups} = useFetchStudentsGroupQuery()
    const [createStudentsGroup, {isLoading}] = useCreateStudentsGroupMutation()

    useEffect(() => {
        if (userList) {
            const allTeachers = userList.filter((user: any) => user.role === 'Teacher')
            setAllTeachers(allTeachers)
            const allStudents = userList.filter((user: any) => user.role === 'Student')
            setAllStudents(allStudents)
        }
    }, [userList])

    useEffect(() => {
        if (allGroups) {
            const filteredGroupList = allGroups?.results.filter((group) => group.course_id === +courseId)
            if (allStudents) {
                const studentsGroups = filteredGroupList?.map((group: any) => group.students)
                console.log(studentsGroups)
                const studentsListWithoutGroup = allStudents.filter((student: any) => {
                    return !new Set(studentsGroups?.flat()).has(student.id)
                })
                setStudentsWithoutGroup(studentsListWithoutGroup)
            }
            if (allTeachers) {
                const teachersGroups = filteredGroupList?.map((group: any) => group.teacher_id)
                console.log(teachersGroups)
                console.log(new Set(teachersGroups))
                console.log(allTeachers)

                const availableTeachers = allTeachers.filter((teacher: any) => {
                    return !new Set(teachersGroups).has(teacher.id)
                })
                setTeachers(availableTeachers)
            }
        }
    }, [allGroups, allStudents, allTeachers])

     const handleTeacher = (teacher: any) => {
        console.log(teacher)
        setTeacherId(teacher.id)
    }

    const handleStudents = (studentsList: any) => {
        console.log(studentsList)
        setStudentsList(studentsList.map((object: any) => object.id))
    }

    const onChangeGroupName = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupName(e.target.value)
    }

    const handleCreateGroup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(studentsList)
        if (courseId) {
            const groupToCreate = {
                name: groupName,
                course_id: +courseId,
                students: studentsList || [],
                teacher_id: +teacher_id,
            }
            await createStudentsGroup(groupToCreate)
        }

        setShowModal(false)
    }

    return (
        <form onSubmit={handleCreateGroup} style={{width: '485px'}} className={styles.container}>
            <div onClick={() => setShowModal(false)} className={styles.container_closed}>
                <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath}/>
            </div>
            <div className={styles.addGroup}>
                <div className={styles.container_header}>
                    <IconSvg width={60} height={49} viewBoxSize="0 0 60 49" path={createGroupIconPath}/>
                    <span className={styles.container_header_title}>Создание группы</span>
                </div>
                <div className={styles.addGroup_input}>
                    <span>Введите название группы:</span>
                    <Input name={'group'} type={'text'} value={groupName} onChange={onChangeGroupName}/>
                    <span>Выбирите учителя из списка:</span>
                    <Select
                        required
                        onChange={handleTeacher}
                        options={teachers}
                        getOptionLabel={(user: any) => user.email}
                        getOptionValue={(user: any) => user.id}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        placeholder={''}
                    />
                    <span>Выбирите учеников:</span>
                    <Select
                        required={false}
                        onChange={handleStudents}
                        options={studentsWithoutGroup}
                        isMulti
                        getOptionLabel={(user: any) => user.email}
                        getOptionValue={(user: any) => user.id}
                        components={{
                            IndicatorSeparator: () => null,
                        }}
                        placeholder={''}
                    />
                </div>
                <div className={styles.addGroup_btn}>
                    <Button
                        type={'submit'}
                        disabled={!groupName || isLoading}
                        variant={!groupName || isLoading ? 'disabled' : 'primary'}
                        text={isLoading ? <SimpleLoader style={{width: '25px', height: '25px'}}
                                                        loaderColor="#ffff"/> : 'Создать группу'}
                    />
                </div>
            </div>
        </form>
    )
}
