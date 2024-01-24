import React, {FC, useEffect, useState} from 'react'

import {result, Section} from 'types/courseStatT'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {groupIconPath, tableBallsStarPath} from 'config/commonSvgIconsPath'
import {accardionArrPath} from 'Pages/StudentCourse/config/svgIconPath'
import styles from './studentInfoAccardion.module.scss'
import {sectionLessons} from "../../../../types/lessonAccessT";
import {useSetStudentLessonsAccessMutation} from '../../../../api/lessonAccessService'
import {LessonsAccardion} from "../LessonsAccardion/LessonsAccardion";

type studentInfoAccardionT = {
    student: result | null
    progress: any
    studentLessons?: sectionLessons[]
    setStudentLessons: any
    resetAccessSetting: () => void
}

export const StudentInfoAccardion: FC<studentInfoAccardionT> = ({
                                                                    student,
                                                                    progress,
                                                                    studentLessons,
                                                                    setStudentLessons,
                                                                    resetAccessSetting
                                                                }) => {
    const [isAccardionOpen, studentInfoAccardion] = useState<boolean>(false)
    const courseStat = progress && progress.courses.find((course: any) => course.course_id === student?.course_id)
    const [setAccess, {isSuccess}] = useSetStudentLessonsAccessMutation()
    const schoolName = window.location.href.split('/')[4]

    const handleAccessSetting = async () => {

        const lesson_data: { lesson_id: number; available: boolean }[] = []
        studentLessons &&
        studentLessons.map(section => {
            section.lessons.map(lesson => {
                lesson_data.push({
                    lesson_id: lesson.lesson_id,
                    available: lesson.availability
                })
            })
        })
        const accessData = {
            student_ids: [student?.student_id],
            lesson_data: lesson_data,
        }

        console.log(accessData)
        await setAccess({data: accessData, schoolName})
            .unwrap()
            .then(async () => {
                console.log('uspeh')
            })
            .catch(error => {
                console.log(error.data)
            })
    }

    return (
        <div className={styles.accardion}>
            <div>
                <div className={styles.accardion_header} onClick={() => studentInfoAccardion(prev => !prev)}>
                    {student?.courses_avatar ? (
                        <img className={styles.accardion_course_img} src={student?.courses_avatar} alt="course_avatar"/>
                    ) : (
                        <div className={styles.accardion_course_avatar}></div>
                    )}
                    <div className={styles.accardion_info}>
                        <p className={styles.accardion_course_name}>{student?.course_name}</p>
                        <div className={styles.accardion_group}>
                            <IconSvg width={14} height={14} viewBoxSize={'0 0 14 14'} path={groupIconPath}/>
                            <span>{student?.group_name}</span>
                        </div>
                    </div>
                    <div className={styles.accardion_progress}>
                        <div className={styles.accardion_progress_item}>
                            <div style={{
                                width: '14px',
                                height: '14px',
                                backgroundColor: '#BA75FF',
                                borderRadius: '50%'
                            }}></div>
                            <span>{courseStat ? `${courseStat.completed_count}/${courseStat.all_baselessons}` : '0/0'}</span>
                        </div>
                        <div className={styles.accardion_progress_item}>
                            <div style={{
                                width: '14px',
                                height: '14px',
                                backgroundColor: '#BA75FF',
                                borderRadius: '50%'
                            }}></div>
                            <span>{courseStat ? courseStat.completed_percent : 0}%</span>
                        </div>
                        <div className={styles.accardion_progress_item}>
                            <IconSvg width={19} height={19} viewBoxSize={'0 0 17 17'} path={tableBallsStarPath}/>
                            {/* заглушка */}
                            <span>{student?.average_mark?.toFixed(0) ?? 0}/{student?.mark_sum ?? 0}</span>
                        </div>
                    </div>
                    <div className={`${styles.accardion_control_btn} ${isAccardionOpen ? styles.open : ''}`}>
                        <IconSvg width={12} height={7} viewBoxSize="0 0 22 13" path={accardionArrPath}/>
                    </div>
                </div>
                {isAccardionOpen && (
                    <LessonsAccardion sectionLessons={studentLessons} setLessons={setStudentLessons}
                                      handleAccessSetting={handleAccessSetting} forStudent={true}
                                      resetAccessSetting={resetAccessSetting}></LessonsAccardion>
                )}
            </div>
        </div>
    )
}
