import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react'

import {Input} from 'components/common/Input/Input/Input'
import {Checkbox} from 'components/common/Checkbox/Checkbox'
import {Button} from 'components/common/Button/Button'
import {SimpleLoader} from 'components/Loaders/SimpleLoader'
import {Dropdown} from 'primereact/dropdown'
import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'
import {useLazyFetchAllUsersQuery} from '../../../../api/allUsersList'
import {PrimeReactProvider} from 'primereact/api'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {useLazyFetchStudentsGroupByCourseQuery} from "../../../../api/studentsGroupService";
import {ToggleButtonDropDown} from "../../../common/ToggleButtonDropDown";
import {useFetchStudentProgressQuery} from "../../../../api/userProgressService";
import {LessonsAccardion} from "../LessonsAccardion/LessonsAccardion";
import {sectionLessons} from "../../../../types/lessonAccessT";

type MainSettingsGroupPropsT = {
    strongSubsequence: boolean
    blockHomework: boolean
    submitHomework: boolean
    submitTest: boolean
    successTest: boolean
    overAiLock: boolean
    certificate: boolean
    title: string
    groupType: string
    isLoading: boolean
    isError: boolean
    setGroupName: any
    duration: number
    changeDuration: any
    isLimited: boolean
    handlerIsLimited: any
    handlerHomeworkCheck: () => void
    handlerSubsequence: () => void
    handlerHomeworkSubmit: () => void
    handlerTestSubmit: () => void
    handlerTestSuccess: () => void
    handlerLockOverAi: () => void
    handleCertificate: () => void
    handleSave: (data: any) => Promise<void>
    deleteGroup: () => void
    teacher: number
    changeTeacher: Dispatch<SetStateAction<any>>
    course: number
    groupLessons?: sectionLessons[]
    setGroupLessons: any
    handleAccessSetting: () => void
}

export const MainSettingsGroup: FC<MainSettingsGroupPropsT> = ({
                                                                   strongSubsequence,
                                                                   blockHomework,
                                                                   submitHomework,
                                                                   submitTest,
                                                                   successTest,
                                                                   overAiLock,
                                                                   certificate,
                                                                   title,
                                                                   groupType,
                                                                   isLoading,
                                                                   isError,
                                                                   handlerHomeworkCheck,
                                                                   handlerSubsequence,
                                                                   handlerHomeworkSubmit,
                                                                   handlerTestSubmit,
                                                                   handlerTestSuccess,
                                                                   handlerLockOverAi,
                                                                   handleCertificate,
                                                                   deleteGroup,
                                                                   setGroupName,
                                                                   duration,
                                                                   changeDuration,
                                                                   isLimited,
                                                                   handlerIsLimited,
                                                                   handleSave,
                                                                   teacher,
                                                                   changeTeacher,
                                                                   course,
                                                                   groupLessons,
                                                                   setGroupLessons,
                                                                   handleAccessSetting
                                                               }) => {
    const schoolName = window.location.href.split('/')[4]
    const [getUsers, {data: allUsers, isSuccess}] = useLazyFetchAllUsersQuery()
    const schoolTariff = localStorage.getItem("schoolTariff");
    const [allTeachers, setAllTeachers] = useState<any>([])
    const [teachers, setTeachers] = useState<string[]>([])
    const [selectedTeacher, setSelectedTeacher] = useState<string>('')
    const [getGroups, {data: courseGroups}] = useLazyFetchStudentsGroupByCourseQuery()
    const [isAccardionOpen, groupInfoAccardion] = useState<boolean>(false)

    useEffect(() => {
        if (schoolName && course) {
            getUsers({schoolName: schoolName, role: "staff", size: 100});
            getGroups({id: course, schoolName});
        }
    }, [schoolName, course])

    useEffect(() => {
        console.log(schoolTariff);
    })

    useEffect(() => {        
        if (allUsers) {
            const allTeachers = allUsers.results.filter((user: any) => user.role === 'Teacher')
            setAllTeachers(allTeachers)
            if (courseGroups) {
                const teachersGroups = courseGroups?.results.map((group: any) => group.teacher_id)
                const availableTeachers = allTeachers.filter((teacher: any) => {
                    return !new Set(teachersGroups).has(teacher.id)
                })
                setTeachers(availableTeachers.map((teacher: any) => teacher.email))
            }
        }
    }, [allUsers, courseGroups])

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
                        <p className={styles.textField}>Ментор группы: </p>
                        <Dropdown value={selectedTeacher}
                                  onChange={handleChangeTeacher}
                                  options={teachers}
                                  placeholder={`${selectedTeacher ? selectedTeacher : 'Выберите ментора для данной группы'}`}
                                  className="w-full md:w-14rem"/>
                    </div>
                    : <p className={styles.groupSetting_description}>Группа не предполагает наличие ментора. Домашние задания принимаются автоматически без проверки</p>}
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
                    <div className={styles.groupSetting_checkboxBlock_checkbox}>
                        <Checkbox id={'submitHomework'} name={'submitHomework'} checked={submitHomework}
                                  onChange={handlerHomeworkSubmit}/>
                        <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
                            <span style={blockHomework || !strongSubsequence ? {color: "#e5e7eb"} : {}}>Необходимость отправки домашних заданий</span>
                            <span>Ученик сможет приступить к следующему занятию только после отправки очередного домашнего задания</span>
                        </div>
                    </div>
                    <div className={styles.groupSetting_checkboxBlock_checkbox}>
                        <Checkbox id={'submitTest'} name={'submitTest'} checked={submitTest}
                                  onChange={handlerTestSubmit}/>
                        <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
                            <span style={!strongSubsequence ? {color: "#e5e7eb"} : {}}>Необходимость отправки тестов</span>
                            <span>Ученик сможет приступить к следующему занятию только после прохождения очередного теста (с любым результатом)</span>
                        </div>
                    </div>
                    <div className={styles.groupSetting_checkboxBlock_checkbox}>
                        <Checkbox id={'successTest'} name={'successTest'} checked={successTest}
                                  onChange={handlerTestSuccess}/>
                        <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
                            <span style={!strongSubsequence || !submitTest ? {color: "#e5e7eb"} : {}}>Необходимость успешного прохождения тестов</span>
                            <span>Ученик сможет приступить к следующему занятию только после успешного прохождения очередного теста (необходимо набрать требуемый процент правильных ответов)</span>
                        </div>
                    </div>
                    {schoolTariff != null && parseInt(schoolTariff, 10) !== 1 && (
                        <div className={styles.groupSetting_checkboxBlock_checkbox}>
                            <Checkbox id={'overAiLock'} name={'overAiLock'} checked={overAiLock} onChange={handlerLockOverAi}/>
                            <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
                                <span>Включить OVER AI</span>
                                <span>Ученики группы смогут пользоваться OVER AI</span>
                            </div>
                        </div>
                    )}
                    <div className={styles.groupSetting_checkboxBlock_checkbox}>
                        <Checkbox id={'certificate'} name={'certificate'} checked={certificate} onChange={handleCertificate}/>
                        <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
                            <span>Включить сертификат</span>
                            <span>После прохождения курса ученики смогут получить сертификат</span>
                        </div>
                    </div>
                </div>
                <div className={styles.groupSetting_duration}>
                    <label>Продолжительность обучения в днях:</label>
                    <div className={styles.groupSetting_duration_limit}>
                        <Checkbox id={'isLimited'} name={'isLimited'} checked={!isLimited}
                                  onChange={handlerIsLimited}/>
                        <span>не ограничена</span>
                        {isLimited && <input value={duration} onChange={changeDuration} type="number"/>}
                    </div>
                </div>

                <ToggleButtonDropDown isOpen={isAccardionOpen} nameOfItems={'уроки'}
                                      handleToggleHiddenBlocks={() => groupInfoAccardion(prev => !prev)}/>
                {isAccardionOpen && groupLessons && (
                    <LessonsAccardion sectionLessons={groupLessons} setLessons={setGroupLessons}
                                      handleAccessSetting={handleAccessSetting} forStudent={false}
                                      resetAccessSetting={undefined}></LessonsAccardion>
                )}

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
