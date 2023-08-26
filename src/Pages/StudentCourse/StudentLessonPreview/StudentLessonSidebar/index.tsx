import {FC, memo, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import {LESSON_TYPE} from 'enum/lessonTypeE'
import {lessonSvgMapper} from '../../../../config'
import {sectionT} from '../../../../types/sectionT'

import styles from '../lesson.module.scss'
import {SimpleLoader} from "../../../../components/Loaders/SimpleLoader";
import {retry} from "@reduxjs/toolkit/query";

type studentLessonSidebar = {
    courseId: string
    sectionId: string
    activeLessonIndex: number
    lessons: sectionT
    lessonType: LESSON_TYPE
}

export const StudentLessonSidebar: FC<studentLessonSidebar> = memo(({courseId, sectionId, activeLessonIndex, lessons: initialLessons, lessonType}) => {
    const navigate = useNavigate();
    const [lessonsComp, setLessonsComp] = useState<sectionT>(initialLessons);
    const school = window.location.href.split('/')[4]

    const isLessonClickable = (lessonIndex: number) => {
        return lessonsComp?.lessons.slice(0, lessonIndex).some((lesson) => !lesson.viewed);
    };

    const updateLessonViewed = (lessonIndex: number, viewed: boolean) => {
        setLessonsComp(prevLessonsComp => {
            const updatedLessons = [...prevLessonsComp.lessons];
            updatedLessons[lessonIndex] = {...updatedLessons[lessonIndex], viewed: viewed};
            return {...prevLessonsComp, lessons: updatedLessons};
        });
    };
    useEffect(() => {
        updateLessonViewed(1, true)
        setLessonsComp(initialLessons)
    }, [initialLessons])

    return lessonsComp && (
        <div className={styles.lesson__block}>
            <p className={styles.lesson__block_title}>Занятия модуля:</p>
            <div>
                {lessonsComp && lessonsComp?.lessons.map(({name, id, type}, index: number) => {
                    const isDisabled = isLessonClickable(index);

                    return (
                        <div
                            style={{cursor: 'pointer'}}
                            key={`${index}`}
                            onClick={() => {
                                if (isDisabled) {
                                    return;
                                }
                                updateLessonViewed(index, true);
                                navigate(`/school/${school}/courses/student-course/${courseId}/module/${sectionId}/${type}/${id}`);
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
    )
});
