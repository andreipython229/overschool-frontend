import {FC, memo} from 'react'
import {useNavigate} from 'react-router-dom'

import {LESSON_TYPE} from 'enum/lessonTypeE'
import {lessonT, sectionT} from '../../../../types/sectionT'
import {Button} from '../../../../components/common/Button/Button'

import styles from '../lesson.module.scss'

type studentLessonNavBtnsT = {
    courseId: string
    sectionId: string
    lessonId: string
    lessonType: LESSON_TYPE
    activeLessonIndex: number
    lessons: sectionT
}

export const StudentLessonNavBtns: FC<studentLessonNavBtnsT> = memo(({
                                                                         courseId,
                                                                         sectionId,
                                                                         lessonType,
                                                                         lessonId,
                                                                         activeLessonIndex,
                                                                         lessons
                                                                     }) => {
    const navigate = useNavigate()
    const school = window.location.href.split('/')[4]

    const lessonBack: lessonT = lessons?.lessons[activeLessonIndex - 1]
    const lessonForward: lessonT = lessons?.lessons[activeLessonIndex + 1]

    return (
        <div className={styles.lesson__btns}>
            <Button
                onClick={() => navigate(`/school/${school}/courses/student-course/${courseId}/module/${sectionId}/${lessonBack?.type || lessonType}/${lessonBack?.id}`)}
                disabled={lessonId === (lessonBack?.id || lessonId)}
                className={styles.lesson__btnPrev}
                text="Предыдущее"
            />
            <Button
                onClick={() =>
                    navigate(`/school/${school}/courses/student-course/${courseId}/module/${sectionId}/${lessonForward?.type || lessonType}/${lessonForward?.id}`)
                }
                className={styles.lesson__btnNext}
                disabled={lessonId === (lessonForward?.id || lessonId)}
                text="Следующее"
            />
        </div>
    )
})
