import {FC, memo, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {LESSON_TYPE} from 'enum/lessonTypeE'
import {lessonSvgMapper} from '../../../../config'
import {sectionT} from '../../../../types/sectionT'

import styles from '../lesson.module.scss'

type studentLessonSidebar = {
    courseId: string
    sectionId: string
    activeLessonIndex: number
    lessons: sectionT
    lessonType: LESSON_TYPE
}

export const StudentLessonSidebar: FC<studentLessonSidebar> = ({courseId, sectionId, activeLessonIndex, lessons, lessonType}) => {
    const navigate = useNavigate()

    const isLessonClickable = (lessonIndex: number) => {
        return lessons.lessons.slice(0, lessonIndex).some((lesson) => !lesson.viewed);
    };

    useEffect(() => {
        console.log('re-rendered')
    }, [courseId])

    return (
        <div className={styles.lesson__block}>
            <p className={styles.lesson__block_title}>Занятия модуля:</p>
            <div>
                {lessons?.lessons.map(({name, id, type, order}, index: number) => {
                    const isDisabled = isLessonClickable(index);

                    return (
                        <div
                            style={{cursor: 'pointer'}}
                            key={order}
                            onClick={() => {
                                if (isDisabled) {
                                    return;
                                }
                                navigate(`/school/School_1/courses/student-course/${courseId}/module/${sectionId}/${type}/${id}`);
                            }}
                            className={`${activeLessonIndex === index && lessonType === type ? styles.lesson__item_active : styles.lesson__item}
                            ${isDisabled ? styles.lesson__item_disabled : ''}`}
                        >
                            {lessonSvgMapper[type]}
                            <span className={styles.lesson__item_name}>{name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
