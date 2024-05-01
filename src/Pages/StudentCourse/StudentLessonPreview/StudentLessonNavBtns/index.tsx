import { FC, memo, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { LESSON_TYPE } from 'enum/lessonTypeE'
import { lessonT, sectionT } from '../../../../types/sectionT'
import { Button } from '../../../../components/common/Button/Button'

import styles from '../lesson.module.scss'
import {useFetchModulesQuery} from "../../../../api/modulesServices";
import NextOrPrevSectionButton from "./NextOrPrevSectionBtn";
import PrevSectionButton from "./PrevSectionBtn";

import { useDispatch } from 'react-redux';
import {setModules} from "../../../../store/redux/modules/modules";


type studentLessonNavBtnsT = {
  courseId: string
  sectionId: string
  lessonId: string
  lessonType: LESSON_TYPE
  activeLessonIndex: number
  nextDisabled: boolean
  lessons: sectionT
}

export const StudentLessonNavBtns: FC<studentLessonNavBtnsT> = memo(({ courseId, sectionId, lessonType, lessonId, activeLessonIndex, nextDisabled, lessons }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const school = window.location.href.split('/')[4]

    const lessonBack: lessonT = lessons?.lessons[activeLessonIndex - 1]
    const lessonForward: lessonT = lessons?.lessons[activeLessonIndex + 1]
    const { data: course } = useFetchModulesQuery({id: courseId as string, schoolName: school})

    const getNextSection = () => {
        if (course !== undefined && course !== null) {
            const currentIndex = course?.sections.findIndex(section => section.section === parseInt(sectionId, 10));
            if (currentIndex !== -1 && currentIndex < course?.sections.length - 1) {
                return course.sections[currentIndex + 1].section;
            }
        }
        return parseInt(sectionId)
    }

    const getPrevSection = () => {
        if (course !== undefined && course !== null) {
            const currentIndex = course?.sections.findIndex(
              (section) => section.section === parseInt(sectionId, 10)
            );
            if (currentIndex !== -1 && currentIndex > 0) {
              return course.sections[currentIndex - 1].section;
            }
        }
        return parseInt(sectionId);
    };

    const prevSectionButtonVisible = () => {
        const prevId = getPrevSection();
        if (prevId === parseInt(sectionId)) {
            return false;
        }
        return activeLessonIndex === 0;
    };

    // const lastLessonInSection = activeLessonIndex !== undefined && activeLessonIndex + 1 === lessons?.lessons.length;
    // const sectionsCount = localStorage.getItem('sections_count');
    // const next1SectionButtonVisible =  lastLessonInSection && sectionsCount !== null && parseInt(sectionId) < parseInt(sectionsCount);

    const nextSectionButtonVisible = () => {
        const nextId = getNextSection();
        const lastLessonInSection = activeLessonIndex !== undefined && activeLessonIndex + 1 === lessons?.lessons.length;
        if (nextId === parseInt(sectionId)) {
            return false;
        }
        return lastLessonInSection;
    };

    useEffect(() => {
      if (course) {
        dispatch(setModules(course));
      }
    }, [course]);

    return (
        <div className={styles.lesson__btns}>
            {!prevSectionButtonVisible() && (
                <Button
                    onClick={() => navigate(`/school/${school}/courses/student-course/${courseId}/module/${sectionId}/${lessonBack?.type || lessonType}/${lessonBack?.id}`)}
                    disabled={lessonId === (lessonBack?.id || lessonId)}
                    className={styles.lesson__btnPrev}
                    text="Предыдущий материал"
                />)
            }

            {prevSectionButtonVisible() && (
                <PrevSectionButton sectionId={getPrevSection()} courseId={parseInt(courseId)} />
            )}

            {!nextSectionButtonVisible() && (
                <Button
                    onClick={() =>
                      navigate(`/school/${school}/courses/student-course/${courseId}/module/${sectionId}/${lessonForward?.type || lessonType}/${lessonForward?.id}`)
                    }
                    className={styles.lesson__btnNext}
                    disabled={(lessonType !== "lesson" && nextDisabled) || (lessonId === (lessonForward?.id || lessonId))}
                    text="Следующий материал"
                />)
            }

            {nextSectionButtonVisible() && (
                <NextOrPrevSectionButton sectionId={getNextSection()} courseId={parseInt(courseId)} nextDisabled={nextDisabled}/>
            )}
        </div>
        )
})
