import React, {FC, useEffect, useState} from 'react'

import {result, Section} from 'types/courseStatT'
import {IconSvg} from 'components/common/IconSvg/IconSvg'
import {groupIconPath, tableBallsStarPath} from 'config/commonSvgIconsPath'
import {accardionArrPath} from 'Pages/StudentCourse/config/svgIconPath'
import {lessonSvgMapper} from 'config'

import styles from './studentInfoAccardion.module.scss'
import {useBoolean} from "../../../../customHooks";
import {CheckboxBall} from "../../../common/CheckboxBall";
import {Button} from "../../../common/Button/Button";
import {Checkbox} from "../../../common/Checkbox/Checkbox";

type studentInfoAccardionT = {
    student: result | null
    progress: any
}

export const StudentInfoAccardion: FC<studentInfoAccardionT> = ({student, progress}) => {
    const [isAccardionOpen, studentInfoAccardion] = useState<boolean>(false)
    const courseStat = progress && progress.courses.find((course: any) => course.course_id === student?.course_id)
    const [lessonsAccessSetting, {onToggle: toggleAccess}] = useBoolean(false)
    const [checkedLessons, setCheckedLessons] = useState<Section[]>([])
    const [ststudent, setStstudent] = useState<boolean>(true)


    useEffect(() => {
        if (student && ststudent) {
        const checked = student?.sections.map((section) => ({...section, lessons: section.lessons.map(lesson => ({...lesson, lessonChecked: true}))}))
        setCheckedLessons(checked)
        setStstudent(false)
    }
    }, [student])


    const handleLessonCheck = (e:any) => {
        setCheckedLessons(checkedLessons.map((section) => ({...section, lessons: section.lessons.map(lesson => ({...lesson, lessonChecked: lesson.lesson_id === Number(e.target.id) ? !lesson.lessonChecked : lesson.lessonChecked}))})))
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
                            <span>
                {student?.average_mark?.toFixed(0) ?? 0}/{student?.mark_sum ?? 0}
              </span>
                        </div>
                    </div>
                    <div className={`${styles.accardion_control_btn} ${isAccardionOpen ? styles.open : ''}`}>
                        <IconSvg width={12} height={7} viewBoxSize="0 0 22 13" path={accardionArrPath}/>
                    </div>
                </div>
                {isAccardionOpen && (
                    <div className={styles.accardion_content}>
                        <div className={styles.accardion_content_check}>
                            <CheckboxBall isChecked={lessonsAccessSetting} toggleChecked={toggleAccess}/>
                            <span className={styles.accardion_content_check_span}>Настройка доступа к урокам</span>
                            {lessonsAccessSetting ?
                                <Button className={styles.accardion_content_check_btn} text={'Сохранить настройки'}/> :
                                <span className={styles.accardion_content_check_fake}></span>}
                        </div>
                        {checkedLessons?.map(({lessons, section_id, name}) => (
                            lessons.length > 0 && (<div className={styles.accardion_item} key={section_id}>
                                <p className={styles.accardion_item_name}>{name}</p>
                                <div className={styles.accardion_lessons_block}>
                                    {lessons?.map(({lesson_id, order, type, name, active, lessonChecked}, index: number) => (
                                        active && (<div key={order + index} className={styles.accardion_lesson}>
                                            <div>{lessonSvgMapper[type]}</div>
                                            <p className={styles.accardion_lesson_name}>{name}</p>
                                            {lessonsAccessSetting &&
                                                <Checkbox id={`${lesson_id}`} name={'check'} checked={lessonChecked}
                                             onChange={handleLessonCheck}/>}
                                            <div></div>
                                        </div>)
                                    ))}
                                </div>
                            </div>)
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
