import React, {ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState} from 'react'

import {Input} from 'components/common/Input/Input/Input'
import {Checkbox} from 'components/common/Checkbox/Checkbox'
import {Button} from 'components/common/Button/Button'
import {SimpleLoader} from 'components/Loaders/SimpleLoader'
import {Dropdown} from 'primereact/dropdown'
import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'
import styles_check from 'components/Modal/StudentLogs/LessonsAccardion/lessonsAccardion.module.scss'
import {useLazyFetchAllUsersQuery} from '../../../../api/allUsersList'
import {PrimeReactProvider} from 'primereact/api'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {useLazyFetchStudentsGroupByCourseQuery} from "../../../../api/studentsGroupService";
import {ToggleButtonDropDown} from "../../../common/ToggleButtonDropDown";
import {useFetchStudentProgressQuery} from "../../../../api/userProgressService";
import {LessonsAccardion} from "../LessonsAccardion/LessonsAccardion";
import {sectionLessons} from "../../../../types/lessonAccessT";
import {checkCourseT} from "../../../../types/CoursesT";
import {GroupsDropDown} from "../../../SelectDropDown/GroupsDropDown";
import {CheckboxBall} from "../../../common/CheckboxBall";

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
    checkCourses?: checkCourseT[]
    setCheckCourses: any
    handleNextCourses: () => void
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
                                                                   handleAccessSetting,
                                                                   checkCourses,
                                                                   setCheckCourses,
                                                                   handleNextCourses
                                                               }) => {
    const schoolName = window.location.href.split('/')[4]
    const [getUsers, {data: allUsers, isSuccess}] = useLazyFetchAllUsersQuery()
    const [allTeachers, setAllTeachers] = useState<any>([])
    const [teachers, setTeachers] = useState<string[]>([])
    const [selectedTeacher, setSelectedTeacher] = useState<string>('')
    const [getGroups, {data: courseGroups}] = useLazyFetchStudentsGroupByCourseQuery()
    const [isAccardionOpen, groupInfoAccardion] = useState<boolean>(false)
    const [isSelectNextCourses, setIsSelectNextCourses] = useState<boolean>(false)
    const [selectedCourses, setSelectedCourses] = useState<checkCourseT[]>([]);
    const addCourse = (courseId: string) => {
        // console.log('Выбранный ID курса:', courseId);
        if (courseId) {
            const selectedCourse = checkCourses?.find(course => course.course_id === parseInt(courseId));
            if (selectedCourse && !selectedCourses.some(course => course.course_id === parseInt(courseId))) {
                const updatedCourses = [...selectedCourses, selectedCourse];
                setSelectedCourses(updatedCourses);
                // console.log('Обновленные выбранные курсы:', updatedCourses);
            }
        }
    };

    useEffect(() => {
        if (schoolName && course) {
            getUsers({schoolName: schoolName, role: "staff", size: 100});
            getGroups({id: course, schoolName});
        }
    }, [schoolName, course])

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

    const handleIsSelect = () => {
        setIsSelectNextCourses(!isSelectNextCourses)
    }

    const handleCheck = (course_id: number, group_id: number | null) => {
        setCheckCourses((prevCourses: checkCourseT[]) =>
            prevCourses?.map((courseItem: checkCourseT) =>
                courseItem.course_id === course_id
                    ? {
                        ...courseItem,
                        selected_group: group_id,
                    }
                    : courseItem,
            )
        )
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
                    : <p className={styles.groupSetting_description}>Группа не предполагает наличие ментора. Домашние
                        задания принимаются автоматически без проверки</p>}
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
                            <span
                                style={!strongSubsequence ? {color: "#e5e7eb"} : {}}>Необходимость отправки тестов</span>
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
                    <div className={styles.groupSetting_checkboxBlock_checkbox}>
                        <Checkbox id={'overAiLock'} name={'overAiLock'} checked={overAiLock}
                                  onChange={handlerLockOverAi}/>
                        <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>
                            <span>Включить OVER AI</span>
                            <span>Ученики группы смогут пользоваться OVER AI</span>
                        </div>
                    </div>
                    <div className={styles.groupSetting_checkboxBlock_checkbox}>
                        <Checkbox id={'certificate'} name={'certificate'} checked={certificate}
                                  onChange={handleCertificate}/>
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
                {/*<div className={styles.groupSetting_checkboxBlock_checkbox}>*/}
                {/*    <Checkbox id={'selectCourses'} name={'selectCourses'} checked={isSelectNextCourses}*/}
                {/*              onChange={handleIsSelect}/>*/}
                {/*    <div className={styles.groupSetting_checkboxBlock_checkbox_desc}>*/}
                {/*        <span>Выбрать курсы, доступные после прохождения текущего</span>*/}
                {/*        <span>Ученик будет добавлен в выбранные группы соответствующих курсов после прохождения курса текущей группы</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={styles.groupSetting_courseAccess_header}>
                    <div className={styles_check.accardion_content_check}>
                        <CheckboxBall isChecked={isSelectNextCourses} toggleChecked={handleIsSelect}/>
                        <span
                            className={styles_check.accardion_content_check_span}>Настройка последующего доступа к курсам</span>
                    </div>
                    {isSelectNextCourses
                        ? <Button className={styles_check.accardion_content_buttons_btn_right} text={'Сохранить'}
                                  onClick={handleNextCourses}/>
                        : <span className={styles_check.accardion_content_fake}></span>}</div>
                {isSelectNextCourses && (
                    <div className={styles.groupSetting_courseAccess_content}>
        <span className={styles.groupSetting_courseAccess_content_desc}>
            Ученик будет добавлен в выбранные группы соответствующих курсов после прохождения курса текущей группы
        </span>
                        <div className={styles.courseSelect}>
                            <select onChange={(e) => addCourse(e.target.value)}>
                                <option value="">Выберите курс</option>
                                {checkCourses && checkCourses.map(({course_id, name}) => (
                                    <option key={course_id} value={course_id}>{name}</option>
                                ))}
                            </select></div>
                        {selectedCourses.map(({
                                                  course_id,
                                                  name,
                                                  student_groups,
                                                  selected_group
                                              }, index) => (
                            <div className={styles.groupSetting_courseAccess_content_course} key={index}>
                                <div className={styles.groupSetting_courseAccess_content_course_name}>
                                    <span>{name}</span>
                                </div>
                                <GroupsDropDown
                                    dropdownData={student_groups}
                                    course_id={course_id}
                                    selected_group={selected_group}
                                    onChangeGroup={(group) => handleCheck(course_id, group)}
                                />
                            </div>
                        ))}
                    </div>
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
