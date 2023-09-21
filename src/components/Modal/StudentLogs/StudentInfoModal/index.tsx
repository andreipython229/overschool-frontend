import React, {FC, useEffect, useState} from 'react'

import {crossIconPath, tableBallsStarPath} from 'config/commonSvgIconsPath'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {Button} from 'components/common/Button/Button'
import {StudentInfoAccardion} from './StudentInfoAccardion'
import {result} from 'types/courseStatT'

import {convertDate} from 'utils/convertDate'
import mainStyles from '../../Modal.module.scss'
import styles from './studentInfoModal.module.scss'
import {useFetchStudentProgressQuery} from "../../../../api/userProgressService";
import {useDeleteStudentFromGroupMutation} from "../../../../api/studentsGroupService";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


type studentInfoModalT = {
    student: result | null
    closeModal: () => void
}

interface ICoursesProgress {
    course_id: number
    course_name: string
    all_baselessons: number
    completed_count: number
    completed_percent: number
    lessons: {
        completed_percent: number,
        all_lessons: number,
        completed_lessons: number
    }
    homeworks: {
        completed_percent: number,
        all_lessons: number,
        completed_lessons: number
    }
    tests: {
        completed_percent: number,
        all_lessons: number,
        completed_lessons: number
    }
}

type studentProgressT = {
    student: string
    school_id: number
    school_name: string
    courses: ICoursesProgress[]
}

export const StudentInfoModal: FC<studentInfoModalT> = ({student, closeModal}) => {
    const lastActivity = new Date(student?.last_active || '')
    const {mmddyyyy} = convertDate(lastActivity)
    const [studentProgress, setStudentProgress] = useState<studentProgressT>()
    const {data, isSuccess} = useFetchStudentProgressQuery(student?.student_id || '')
    const [completedPercent, setCompletedPercent] = useState<number>()
    const [openAlert, setOpenAlert] = useState<boolean>(false)

    const [deleteStudent] = useDeleteStudentFromGroupMutation()

    const handleOpenAlert = () => {
        setOpenAlert(true)
    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    useEffect(() => {
        setStudentProgress(data)
    }, [isSuccess])

    useEffect(() => {
        if (studentProgress) {
            const percentsArray = studentProgress?.courses.map((course) => {
                return course.completed_percent
            })

            const sum = percentsArray.reduce((acc, curr) => {
                return acc + curr;
            }, 0);

            setCompletedPercent(sum / percentsArray.length)
        }
    }, [studentProgress])

    const handleDeleteStudent = async () => {
        const formData = new FormData();
        formData.append('user_ids', String(student?.student_id));
        formData.append('role', 'Student');
        formData.append('student_groups', String(student?.group_id))

        await deleteStudent(formData)
        setOpenAlert(false)
        closeModal()
    }

    return (
        <div className={mainStyles.main} role="dialog" aria-modal="true">
            <div className={styles.close_btn} onClick={closeModal}>
                <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath}/>
            </div>
            <div className={styles.content}>
                <div className={styles.student_block}>
                    {student?.avatar ?
                        <img
                            width={'50'}
                            height={'50'}
                            className={styles.student_block_avatar}
                            src={student?.avatar}
                            alt="avatar"
                        />
                        :
                        <div
                            className={styles.student_block_avatar}>{`${student?.first_name.charAt(0) || 'Б'} ${student?.last_name.charAt(0) || 'И'}`}</div>
                    }
                    <h3 className={styles.student_block_name}>{`${student?.first_name || 'без'} ${student?.last_name || 'имени'}`}</h3>
                    <p className={styles.student_block_email}>{student?.email}</p>
                    <p className={styles.student_block_activity}>Был(а) онлайн {`${mmddyyyy}`}</p>
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
                            <div style={{
                                width: '17px',
                                height: '17px',
                                backgroundColor: '#BA75FF',
                                borderRadius: '50%'
                            }}>
                            </div>
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
                    <StudentInfoAccardion student={student} progress={studentProgress}/>
                </div>
                {student?.group_name &&
                    <div>
                        <Button style={{margin: '10px'}} text={`Удалить ученика из группы "${student?.group_name}"`}
                                onClick={handleOpenAlert} variant={'delete'}/>
                        <Dialog
                            open={openAlert}
                            onClose={handleCloseAlert}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {`Удалить студента из группы "${student.group_name}"?`}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Это действие безвозвратно удалит студента {`"${student.first_name || "Без"} ${student.last_name || "Имени"}"`} из группы {`"${student.group_name}"`}.
                                    Вы уверены, что хотите продолжить?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseAlert} text={'Отмена'}/>
                                <Button onClick={handleDeleteStudent} autoFocus variant={'delete'} text={'Удалить из группы'}/>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
            </div>
        </div>
    )
}
