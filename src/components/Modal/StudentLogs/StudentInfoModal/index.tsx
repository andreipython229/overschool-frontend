import React, {FC, useEffect, useState} from 'react'
import { DateTime } from 'luxon';

import {crossIconPath, tableBallsStarPath} from 'config/commonSvgIconsPath'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {Button} from 'components/common/Button/Button'
import {StudentInfoAccardion} from './StudentInfoAccardion'
import {result} from 'types/courseStatT'

import {convertDate} from 'utils/convertDate'
import mainStyles from '../../Modal.module.scss'
import styles from './studentInfoModal.module.scss'
import {useFetchStudentProgressQuery} from '../../../../api/userProgressService'
import {
    useLazyFetchStudentLessonsQuery,
    useResetStudentLessonsAccessMutation
} from '../../../../api/lessonAccessService'
import { useFetchStudentsGroupByCourseQuery, useFetchStudentsGroupQuery, useLazyFetchStudentsGroupByCourseQuery, useUpdateGroupMutation } from 'api/studentsGroupService'
import {useDeleteStudentFromGroupMutation} from '../../../../api/studentsGroupService'
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select} from '@mui/material'
import DatePicker, {registerLocale} from 'react-datepicker'
import {groupSections, sectionLessons} from "../../../../types/lessonAccessT";
import { useAppSelector } from 'store/hooks'
import { headerUserRoleName } from '../../../../config/headerUserRoleName'
import {selectUser} from '../../../../selectors'
import { studentsGroupsT } from 'types/studentsGroup';
import { log } from 'console';
import { useParams } from 'react-router-dom';

type studentInfoModalT = {
    student: result | null
    closeModal: () => void
    isStudentDeleted: () => void
}

interface ICoursesProgress {
    course_id: number
    course_name: string
    all_baselessons: number
    completed_count: number
    completed_percent: number
    lessons: {
        completed_percent: number
        all_lessons: number
        completed_lessons: number
    }
    homeworks: {
        completed_percent: number
        all_lessons: number
        completed_lessons: number
    }
    tests: {
        completed_percent: number
        all_lessons: number
        completed_lessons: number
    }
}

type studentProgressT = {
    student: string
    school_id: number
    school_name: string
    courses: ICoursesProgress[]
}

type Group = {
    id: number
    course_id: number
    name: string
}

type TargetGroup = {
    id: number;
    name: string;
} | null;

export const StudentInfoModal: FC<studentInfoModalT> = ({student, closeModal, isStudentDeleted}) => {
    const lastActivity = student?.last_login ? student.last_login : null;
    const schoolName = window.location.href.split('/')[4]
    const schoolId = localStorage.getItem('school_id')
    const { course_id: courseId } = useParams()
    const [studentProgress, setStudentProgress] = useState<studentProgressT>()
    const {data} = useFetchStudentProgressQuery({user_id: String(student?.student_id), schoolName})
    const [fetchStudentLessons, {data: allStudentLessons, isFetching}] = useLazyFetchStudentLessonsQuery()
    const { data: groups } = useFetchStudentsGroupByCourseQuery({ schoolName, id: courseId ?? '' });
    const [studentLessons, setStudentLessons] = useState<sectionLessons[]>()
    const [resetAccess, {isSuccess}] = useResetStudentLessonsAccessMutation()
    const [completedPercent, setCompletedPercent] = useState<number>()
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [openMoveStudent, setMoveStudent] = useState<boolean>(false)
    const [deleteStudent] = useDeleteStudentFromGroupMutation()
    const [removeDate, setRemoveDate] = useState<Date>(new Date())
    const [datePickerClass, setDatePickerClass] = useState<any>();
    const TEN_MINUTES = 10 * 60 * 1000;
    const currentTime = new Date();
    let activityMessage;
    const { role } = useAppSelector(selectUser);
    const [targetGroup, setTargetGroup] = useState<TargetGroup>(null);
    const [updateGroup] = useUpdateGroupMutation();

    const handleOpenAlert = () => {
        setOpenAlert(true)
    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleOpenMoveStudent = () => {
        setMoveStudent(true)
    }

    const handleCloseMoveStudent = () => {
        setMoveStudent(false)
    }

    useEffect(() => {
        setStudentProgress(data)
    }, [data])

    useEffect(() => {
        if (studentProgress) {
            const percentsArray = studentProgress?.courses.map(course => {
                return course.completed_percent
            })

            const sum = percentsArray.reduce((acc, curr) => {
                return acc + curr
            }, 0)
            
            setCompletedPercent(+(sum / percentsArray.length).toFixed(2))
        }
    }, [studentProgress])

    

    useEffect(() => {
        schoolId && student && fetchStudentLessons({id: schoolId, student_id: student?.student_id})
    }, [student])

    useEffect(() => {
        if (allStudentLessons) {
            const lessonsPerGroup: groupSections | undefined = allStudentLessons.student_data.find((item: groupSections) => item.group_id === student?.group_id)
            lessonsPerGroup && setStudentLessons(lessonsPerGroup.sections)
        }
    }, [allStudentLessons])

    const onChange = (date: Date): void => {
        setRemoveDate(date)
    }

    if (lastActivity) {
        const timeDifference = currentTime.getTime() - new Date(lastActivity).getTime();

        if (timeDifference < TEN_MINUTES) {
            activityMessage = "Онлайн";
        } else {
            
            const lastLoginDateTime = DateTime.fromISO(lastActivity, { zone: 'utc' });
            const formattedDate = lastLoginDateTime.toFormat('dd.MM.yyyy');
            activityMessage = `Был(а) онлайн ${formattedDate}`;
        }
    } else {
        activityMessage = "Был(а) онлайн давно";
    }

    const resetAccessSetting = async () => {
        const data = {
            student_id: student?.student_id,
            group_id: student?.group_id,
        }
        await resetAccess({data: data, schoolName})
            .unwrap()
            .then(async () => {
                console.log('uspeh')
                schoolId && student && fetchStudentLessons({id: schoolId, student_id: student?.student_id})
            })
            .catch(error => {
                console.log(error.data)
            })
    }

    const handleDeleteStudent = async () => {
        const formData = new FormData()
        formData.append('user_ids', String(student?.student_id))
        formData.append('role', 'Student')
        formData.append('student_groups', String(student?.group_id))
        const year = removeDate.getFullYear()
        const month = ("0" + (removeDate.getMonth() + 1)).slice(-2)
        const day = ("0" + removeDate.getDate()).slice(-2)
        let hours: string = (removeDate.getHours() - 3).toString();
        hours = ("0" + hours).slice(-2);
        const minutes = ("0" + removeDate.getMinutes()).slice(-2);
        const seconds = ("0" + removeDate.getSeconds()).slice(-2);
        formData.append('date', `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

        await deleteStudent({data: formData, schoolName: schoolName}).unwrap()
            .then(async data => {
                await setOpenAlert(false)
                await closeModal()
            })
            .catch(async error => {
                await setOpenAlert(false)
                console.log(error.data)
                await closeModal()
            })
            await isStudentDeleted()
    }

    const handleMoveStudent = async () => {
        if (student?.student_id && targetGroup) {
            try {
                await updateGroup({
                    user_ids: [student.student_id],
                    new_group_id: targetGroup.id,
                    schoolName,
                    id: student.group_id
                }).unwrap();
                handleCloseMoveStudent();
                closeModal();
                isStudentDeleted();
            } catch (error) {
                console.error('Ошибка при перемещении студента:', error);
            }
        }
    }

    const availableGroups = groups?.results
    ? groups.results.filter((group: studentsGroupsT) => 
        group.course_id === student?.course_id && group.group_id !== student?.group_id
      )
    : [];

    console.log(availableGroups)

    return (
        <div className={mainStyles.main} role="dialog" aria-modal="true">
            <div className={styles.close_btn} onClick={closeModal}>
                <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath}/>
            </div>
            <div className={styles.content}>
                <div className={styles.student_block}>
                    {student?.avatar ? (
                        <img width={'50'} height={'50'} className={styles.student_block_avatar} src={student?.avatar}
                             alt="avatar"/>
                    ) : (
                        <div
                            className={styles.student_block_avatar}>{`${student?.first_name.charAt(0) || 'Б'} ${student?.last_name.charAt(0) || 'И'}`}</div>
                    )}
                    <h3 className={styles.student_block_name}>{(student?.last_name && student?.first_name) ? `${student?.last_name}  ${student?.first_name}` :
                        (student?.last_name || student?.first_name || "Нет имени")}</h3>
                    <p className={styles.student_block_email}>{student?.email}</p>
                    <p className={styles.student_block_activity}>{activityMessage}</p>
                </div>
                {/* <div className={styles.student_actions}>
          <Button text="Написать в чат" />
          <Button text="Действия" />
        </div> */}
                <div className={styles.student_progress}>
                    <div>
                        <span className={styles.student_progress_title}>Общий прогресс</span>
                        <div className={styles.student_progress_info}>
                            {/* заглушка */}
                            <div
                                style={{
                                    width: '17px',
                                    height: '17px',
                                    backgroundColor: '#BA75FF',
                                    borderRadius: '50%',
                                }}
                            ></div>
                            <span>{completedPercent}%</span>
                        </div>
                    </div>
                    <div>
                        <span className={styles.student_progress_title}>Средний балл</span>
                        <div className={styles.student_progress_info}>
                            <IconSvg width={19} height={19} viewBoxSize={'0 0 17 17'} path={tableBallsStarPath}/>
                            <span>{student?.average_mark?.toFixed(0) ?? 0}</span>
                        </div>
                    </div>
                    <div>
                        <span className={styles.student_progress_title}>Суммарный балл</span>
                        <div className={styles.student_progress_info}>
                            <IconSvg width={19} height={19} viewBoxSize={'0 0 17 17'} path={tableBallsStarPath}/>
                            <span>{student?.mark_sum ?? 0}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.accardions}>
                    <StudentInfoAccardion student={student} progress={studentProgress} studentLessons={studentLessons}
                                          setStudentLessons={setStudentLessons}
                                          resetAccessSetting={resetAccessSetting}/>
                </div>
                {student?.group_name && headerUserRoleName[role] === 'Администратор' && (
                    <div className="button-container" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button
                            className={styles.student_button}
                            text={`Переместить ученика в другую группу`}
                            onClick={handleOpenMoveStudent}
                            />
                        <Dialog
                            open={openMoveStudent}
                            onClose={handleCloseMoveStudent}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Переместить студента</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Выберите группу, в которую хотите переместить студента:
                                </DialogContentText>
                                <Select
                                    value={targetGroup ? targetGroup.id.toString() : ''}
                                    onChange={(e) => {
                                        const selectedGroupId = parseInt(e.target.value, 10);
                                        const selectedGroup = availableGroups.find(group => group.group_id === selectedGroupId);
                                        if (selectedGroup && selectedGroup.group_id !== undefined) {
                                            setTargetGroup({ id: selectedGroup.group_id, name: selectedGroup.name });
                                        }
                                    }}
                                    fullWidth
                                >
                                    <MenuItem value="Выберите группу для переноса" disabled>
                                        Выберите группу для переноса
                                    </MenuItem>
                                    {availableGroups.map(group => (
                                        <MenuItem key={group.group_id} value={group.group_id}>
                                            {group.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseMoveStudent} color="primary" text={`Отмена`} />
                                <Button onClick={handleMoveStudent} color="primary" autoFocus text={`Переместить`} />
                            </DialogActions>
                        </Dialog>
                        <Button
                            style={{margin: '10px'}}
                            text={`Удалить ученика из группы "${student?.group_name}"`}
                            onClick={handleOpenAlert}
                            variant={'delete'}
                        />
                        <Dialog className={styles.dialog} open={openAlert} onClose={handleCloseAlert}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                            <DialogTitle
                                id="alert-dialog-title">{`Удалить студента из группы "${student.group_name}"?`}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Это действие безвозвратно удалит
                                    студента {`"${student.first_name || 'Без'} ${student.last_name || 'Имени'}"`} из
                                    группы{' '}
                                    {`"${student.group_name}"`}. Если уверены, что хотите продолжить, можете выбрать
                                    дату удаления
                                </DialogContentText>
                            </DialogContent>
                            <div className={styles.datepicker}>
                                <div className={datePickerClass}>
                                    <DatePicker selected={removeDate} onChange={onChange}
                                                minDate={new Date(student.date_added ? student.date_added : "09/01/2023")}
                                                maxDate={new Date()} dateFormat="dd/MM/yyyy" locale="ru"
                                                onCalendarOpen={() => setDatePickerClass(styles.datepicker_open)}
                                                onCalendarClose={() => setDatePickerClass(null)}>
                                    </DatePicker>
                                </div>
                            </div>
                            <DialogActions>
                                <Button onClick={handleCloseAlert} text={'Отмена'}/>
                                <Button onClick={handleDeleteStudent} autoFocus variant={'delete'}
                                        text={'Удалить из группы'}/>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}
            </div>
        </div>
    )
}
