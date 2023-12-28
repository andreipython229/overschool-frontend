import React, {FC, useEffect, useState} from 'react'

import {lessonSvgMapper} from 'config'
import styles from './lessonsAccardion.module.scss'
import {useBoolean} from "../../../../customHooks";
import {CheckboxBall} from "../../../common/CheckboxBall";
import {Button} from "../../../common/Button/Button";
import {Checkbox} from "../../../common/Checkbox/Checkbox";
import {sectionLessons} from "../../../../types/lessonAccessT";


type lessonsAccardionT = {
    sectionLessons?: sectionLessons[]
    setLessons: any
    handleAccessSetting: () => void
}

export const LessonsAccardion: FC<lessonsAccardionT> = ({
                                                                sectionLessons,
                                                                setLessons,
                                                                handleAccessSetting
                                                            }) => {
    const [lessonsAccessSetting, {onToggle: toggleAccess}] = useBoolean(false)

    const handleLessonCheck = (e: any) => {
        sectionLessons &&
        setLessons(sectionLessons.map((section) => ({
            ...section,
            lessons: section.lessons.map(lesson => ({
                ...lesson,
                availability: lesson.lesson_id === Number(e.target.id) ? !lesson.availability : lesson.availability
            }))
        })))
    }

    return (
        <div className={styles.accardion_content}>
            <div className={styles.accardion_content_check}>
                <CheckboxBall isChecked={lessonsAccessSetting} toggleChecked={toggleAccess}/>
                <span className={styles.accardion_content_check_span}>Настройка доступа к урокам</span>
                {lessonsAccessSetting ?
                    <Button className={styles.accardion_content_check_btn} text={'Сохранить настройки'}
                            onClick={handleAccessSetting}/> :
                    <span className={styles.accardion_content_check_fake}></span>}
            </div>
            {sectionLessons?.map(({lessons, section_id, name}) => (
                lessons.length > 0 && (<div className={styles.accardion_item} key={section_id}>
                    <p className={styles.accardion_item_name}>{name}</p>
                    <div className={styles.accardion_lessons_block}>
                        {lessons?.map(({
                                           lesson_id,
                                           // order,
                                           type,
                                           name,
                                           active,
                                           availability
                                       }, index: number) => (
                            active && (<div key={index} className={styles.accardion_lesson}>
                                <div>{lessonSvgMapper[type]}</div>
                                <p className={styles.accardion_lesson_name}>{name}</p>
                                {lessonsAccessSetting &&
                                    <Checkbox id={`${lesson_id}`} name={'check'} checked={availability}
                                              onChange={handleLessonCheck}/>}
                                <div></div>
                            </div>)
                        ))}
                    </div>
                </div>)
            ))}
        </div>
    )
}
