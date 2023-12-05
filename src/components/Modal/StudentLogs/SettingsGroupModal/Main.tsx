import {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react'

import {Input} from 'components/common/Input/Input/Input'
import {Checkbox} from 'components/common/Checkbox/Checkbox'
import {Button} from 'components/common/Button/Button'
import {SimpleLoader} from 'components/Loaders/SimpleLoader'
import {Dropdown} from 'primereact/dropdown'
import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'
import {useFetchAllUsersQuery} from '../../../../api/allUsersList'
import {PrimeReactProvider} from 'primereact/api'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {useFetchStudentsGroupByCourseQuery} from "../../../../api/studentsGroupService";

type MainSettingsGroupPropsT = {
    strongSubsequence: boolean
    blockHomework: boolean
    title: string
    groupType: string
    isLoading: boolean
    isError: boolean
    setGroupName: any
    handlerHomeworkCheck: () => void
    handlerSubsequence: () => void
    handleSave: (data: any) => Promise<void>
    deleteGroup: () => void
    teacher: number
    changeTeacher: Dispatch<SetStateAction<any>>
    course: number
}

export const MainSettingsGroup: FC<MainSettingsGroupPropsT> = ({
                                                                   strongSubsequence,
                                                                   blockHomework,
                                                                   title,
                                                                   groupType,
                                                                   isLoading,
                                                                   isError,
                                                                   handlerHomeworkCheck,
                                                                   handlerSubsequence,
                                                                   deleteGroup,
                                                                   setGroupName,
                                                                   handleSave,
                                                                   teacher,
                                                                   changeTeacher,
                                                                   course
                                                               }) => {
    const {data: allUsers, isSuccess} = useFetchAllUsersQuery()
    const [allTeachers, setAllTeachers] = useState<any>([])
    const [teachers, setTeachers] = useState<string[]>([])
    const [selectedTeacher, setSelectedTeacher] = useState<string>('')
    const {data: courseGroups} = useFetchStudentsGroupByCourseQuery(course)

    useEffect(() => {
        if (allUsers) {
            const allTeachers = allUsers.filter((user: any) => user.role === 'Teacher')
            setAllTeachers(allTeachers)
        }
    }, [isSuccess])

    useEffect(() => {
        allTeachers.find((obj: any) => {
            if (obj.id === teacher) {
                setSelectedTeacher(obj.email)
            }
        })
    }, [allTeachers])

    useEffect(() => {
        allTeachers.find((obj: any) => {
            if (obj.email === selectedTeacher) {
                changeTeacher(Number(obj.id))
            }
        })
    }, [selectedTeacher])

    useEffect(() => {
        if (courseGroups) {
            if (allTeachers) {
                const teachersGroups = courseGroups?.results.map((group: any) => group.teacher_id)
                const availableTeachers = allTeachers.filter((teacher: any) => {
                    return !new Set(teachersGroups).has(teacher.id)
                })
                setTeachers(availableTeachers.map((teacher: any) => teacher.email))
            }
        }
    }, [courseGroups, allTeachers])


    const handleChangeGroupName = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'groupName') {
            setGroupName(e.target.value)
        }
    }

    const handleChangeTeacher = (e: any) => {
        const changedTeachers = [...teachers.filter((teacher: string) => teacher !== e.value), selectedTeacher]
        setTeachers(changedTeachers)
        setSelectedTeacher(e.value)
    }

    return (
        <>
            <PrimeReactProvider>
                <div className={styles.groupSetting_input}>
                    <Input name={'groupName'} value={title} type={'text'} label={'Название группы:'}
                           onChange={handleChangeGroupName}/>
                </div>
                {groupType === "WITH_TEACHER" ?
                <div className="card flex p-fluid">
                    <p className={styles.textField}>Преподаватель данной группы: </p>
                    <Dropdown value={selectedTeacher}
                              onChange={handleChangeTeacher}
                              options={teachers}
                              placeholder={`${selectedTeacher ? selectedTeacher : 'Выберите преподавателя для данной группы'}`}
                              className="w-full md:w-14rem"/>
                </div> : <></>}
                <div className={styles.groupSetting_checkboxBlock}>
                    <div className={styles.groupSetting_checkboxBlock_checkbox}>
                        <Checkbox id={'homework'} name={'homework'} checked={blockHomework}
                                  onChange={handlerHomeworkCheck}/>
                        <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
                            <span>Блокировать возможность отправки домашних заданий</span>
                            <span>Ученики будут видеть домашние задания, смогут их выполнять, но не смогут отправлять их вам на проверку</span>
                        </div>
                    </div>
                    <div className={styles.groupSetting_checkboxBlock_checkbox}>
                        <Checkbox id={'strongSubsequence'} name={'strongSubsequence'} checked={strongSubsequence}
                                  onChange={handlerSubsequence}/>
                        <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
                            <span>Строгая последовательность занятий</span>
                            <span>Ученик сможет приступить к следующему занятию только после прохождения предыдущего</span>
                        </div>
                    </div>
                </div>
                {/*  {strongSubsequence && (*/}
                {/*      <div className={styles.groupSetting_selectBlock}>*/}
                {/*          /!* <div className={styles.groupSetting_selectBlock_select}>*/}
                {/*  <span>Домашние задания</span>*/}
                {/*  <SelectInput optionsList={homeWorkActions} optionName={'actionHomeWork' as keyof object} />*/}
                {/*</div>*/}
                {/*<div className={styles.groupSetting_selectBlock_select}>*/}
                {/*  <span>Тесты</span>*/}
                {/*  <SelectInput optionsList={testActions} optionName={'actionTest' as keyof object} />*/}
                {/*</div> *!/*/}
                {/*      </div>*/}
                {/*  )}*/}
                <div className={styles.groupSetting_btn}>
                    <Button
                        className={styles.groupSetting__delete_btn}
                        disabled={isLoading || isError}
                        variant={'secondary'}
                        text={isLoading ?
                            <SimpleLoader style={{width: '20px', height: '20px'}}
                                          loaderColor="#ffff"/> : 'Сохранить изменения'}
                        onClick={handleSave}
                    />
                    <Button
                        className={styles.groupSetting__delete_btn}
                        disabled={isLoading || isError}
                        variant={'delete'}
                        text={isLoading ?
                            <SimpleLoader style={{width: '20px', height: '20px'}}
                                          loaderColor="#ffff"/> : 'Удалить группу'}
                        onClick={deleteGroup}
                    />
                </div>
            </PrimeReactProvider>
        </>
    )
}
