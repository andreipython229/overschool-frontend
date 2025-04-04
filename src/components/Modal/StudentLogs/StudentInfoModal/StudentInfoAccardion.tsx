import React, {ChangeEvent, FC, useEffect, useState} from 'react'

import {result, Section} from 'types/courseStatT'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {groupIconPath, tableBallsStarPath, peopleIconPath, averageMarkIconPath, progressIconPath} from 'config/commonSvgIconsPath'
import {accardionArrPath} from 'Pages/StudentCourse/config/svgIconPath'
import styles from './studentInfoAccardion.module.scss'
import {sectionLessons} from "../../../../types/lessonAccessT";
import {useSetStudentLessonsAccessMutation, useLazyFetchStudentTrainingDurationQuery, useSetStudentTrainingDurationMutation} from '../../../../api/lessonAccessService'
import {LessonsAccardion} from "../LessonsAccardion/LessonsAccardion";
import {Checkbox} from "../../../common/Checkbox/Checkbox";
import {useFetchStudentProgressQuery} from "../../../../api/userProgressService";
import {RoleE} from "../../../../enum/roleE";
import {Button} from "../../../common/Button/Button";
import {selectUser} from '../../../../selectors';
import {useAppSelector} from "../../../../store/hooks";

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
    const [isLimited, setIsLimited] = useState<boolean>(false)
    const courseStat = progress && progress.courses.find((course: any) => course.course_id === student?.course_id)
    const [setAccess, {isSuccess}] = useSetStudentLessonsAccessMutation()
    const schoolName = window.location.href.split('/')[4]
    const [duration, setDuration] = useState<number>()
    const [download, setDownload] = useState<boolean>()
    const [fetchDuration, {data}] = useLazyFetchStudentTrainingDurationQuery()
    const [assignDuration] = useSetStudentTrainingDurationMutation()
    const { role } = useAppSelector(selectUser);

    useEffect(() => {
        student && fetchDuration({group_id: Number(student?.group_id), student_id: Number(student?.student_id), schoolName})
    }, [student])

    useEffect(() => {
        setDuration(data?.individual_limit);
        setDownload(data?.download);
        data?.individual_limit && setIsLimited(true)
    }, [data])

    const handlerIsLimited = () => {
        setIsLimited(!isLimited)
    }

    const handleDuration = (event: ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(event.target.value))
    }

    const handleDownload = () => {
        setDownload(!download)
    }

    const saveDuration = async () => {
        const durationData = {
            user: student?.student_id,
            students_group: student?.group_id,
            limit: isLimited ? duration : 0,
            download: download
        }
        await assignDuration({data: durationData, schoolName})
    }

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
                            <IconSvg width={14} height={14} viewBoxSize={'0 0 23 23'} path={peopleIconPath}/>
                            <span>{student?.group_name}</span>
                        </div>
                    </div>
                    <div className={styles.accardion_progress}>
                        <div className={styles.accardion_progress_item}>
                            <IconSvg width={16} height={16} viewBoxSize={'0 0 13 13'} path={progressIconPath} />
                            <span>{courseStat ? `${courseStat.completed_count}/${courseStat.all_baselessons}` : '0/0'}</span>
                        </div>
                        <div className={styles.accardion_progress_item}>
                            <IconSvg width={16} height={16} viewBoxSize={'0 0 13 13'} path={progressIconPath} />
                            <span>{courseStat ? courseStat.completed_percent : 0}%</span>
                        </div>
                        <div className={styles.accardion_progress_item}>
                            <IconSvg width={16} height={16} viewBoxSize={'0 0 13 13'} path={averageMarkIconPath} />
                            <span>{student?.average_mark?.toFixed(0) ?? 0}/{student?.mark_sum ?? 0}</span>
                        </div>
                    </div>
                    <div className={`${styles.accardion_control_btn} ${isAccardionOpen ? styles.open : ''}`}>
                        <IconSvg width={12} height={7} viewBoxSize="0 0 22 13" path={accardionArrPath}/>
                    </div>
                </div>
                {isAccardionOpen && <>
                    <div className={styles.accardion_duration}>
                        {role === RoleE.Teacher && <>
                        <div className={styles.accardion_duration_label}>
                            <label>Индивидуальная продолжительность обучения в днях:</label>
                            <span>{isLimited ? duration : 'не установлена'}</span>
                        </div>
                        <div className={styles.accardion_duration_label}>
                            <label>Скачивание видео-уроков:</label>
                            <span>{download ? 'разрешено' : 'не разрешено'}</span>
                        </div></>}
                    {role === RoleE.Admin && <>
                    <div className={styles.accardion_duration_limit}>
                        <div className={styles.accardion_duration_limit_check}>
                            <Checkbox id={'isLimited'} name={'isLimited'} checked={isLimited}
                                      onChange={handlerIsLimited}/>
                            <span>индивидуальная продолжительность обучения в днях</span>
                            {isLimited && <input value={duration} onChange={handleDuration} type="number"/>}
                        </div>
                        <div className={styles.accardion_duration_limit_check}>
                            <Checkbox id={'download'} name={'download'} checked={download}
                                      onChange={handleDownload}/>
                            <span>разрешить скачивать видео-уроки</span>
                        </div>
                    </div>
                    <Button className={styles.accardion_duration_limit_btn} text={'Сохранить'}
                                onClick={saveDuration}/> </>}
                    </div>
                    <LessonsAccardion sectionLessons={studentLessons} setLessons={setStudentLessons}
                                      handleAccessSetting={handleAccessSetting} forStudent={true}
                                      resetAccessSetting={resetAccessSetting}></LessonsAccardion>
               </>}
            </div>
        </div>
    )
}
