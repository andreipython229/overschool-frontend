import {FC, memo, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

import {LESSON_TYPE} from 'enum/lessonTypeE'
import {lessonSvgMapper} from '../../../../config'
import {sectionT} from '../../../../types/sectionT'

import styles from '../lesson.module.scss'
import {useFetchModuleLessonsQuery} from "../../../../api/modulesServices";

type studentLessonSidebar = {
    courseId: string
    sectionId: string
    activeLessonIndex: number
    lessons: sectionT
    lessonType: LESSON_TYPE
}

export const StudentLessonSidebar: FC<studentLessonSidebar> = memo(({courseId, sectionId, activeLessonIndex, lessons, lessonType}) => {
    const navigate = useNavigate()
    const params = useParams()

    const {data: lessonsComp} = useFetchModuleLessonsQuery(`${params?.section_id}`)

    const isLessonClickable = (lessonIndex: number) => {
        return lessonsComp?.lessons.slice(0, lessonIndex).some((lesson) => !lesson.viewed);
    };

    return (
        <div className={styles.lesson__block}>
            <p className={styles.lesson__block_title}>Занятия модуля:</p>
            <div>
                {lessonsComp?.lessons.map(({name, id, type, order, viewed}, index: number) => {
                    const isDisabled = isLessonClickable(index);

                    return (
                        <div
                            style={{cursor: 'pointer'}}
                            key={`${viewed}${id}`}
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
});
