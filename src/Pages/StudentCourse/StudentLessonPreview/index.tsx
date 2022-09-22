import { Link, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { useFetchLessonQuery, useFetchModulesQuery } from '../../../api/modulesServices'
import { backArr } from '../../../components/Previous/config/svgIconPath'
import { arrDownPath } from '../config/svgIconPath'
import { Button } from '../../../components/common/Button/Button'
import { stackIconPath } from '../../School/config/svgIconsPath'

import styles from './lesson.module.scss'
import { useEffect, useState } from 'react'

export const StudentLessonPreview = () => {
  const [showLesson, setShowLesson] = useState<any>()

  const [count, setCount] = useState<any>(0)

  const { course_id: courseId, section_id: sectionId } = useParams()

  const { data: modules } = useFetchModulesQuery(courseId)

  const moduleToShow = modules?.sections.find((module: any) => sectionId && module.section_id === +sectionId)

  const [lessonsId, setLessonsId] = useState<number>(moduleToShow.lessons[0].lesson_id)

  const { data: lessons } = useFetchLessonQuery(lessonsId || moduleToShow.lessons[0].lesson_id)

  useEffect(() => {
    setShowLesson(lessons)
  }, [modules, lessonsId, count, lessons])

  //const lessonToShow = moduleToShow?.lessons.find((lesson: any) => lessonId && lesson.lesson_id === +lessonId)
  //const activeLessonIndex = moduleToShow?.lessons.findIndex((lesson: any) => lessonId && lesson.lesson_id === +lessonId)console.log()
  //const lessonIdBack = moduleToShow?.lessons[activeLessonIndex - 1]?.lesson_id || lessonId
  //const lessonIdForward = moduleToShow?.lessons[activeLessonIndex + 1]?.lesson_id || lessonId

  const handleClick = (event: any) => {
    setLessonsId(event.target.id)
  }

  // const nextLesson = () => {
  //   setCount((count: any) => count + 1)
  //   setLessonsId(moduleToShow.lessons[count].lesson_id)
  // }
  // const prevLesson = () => {
  //   setCount((count: any) => count - 1)
  //   setLessonsId(moduleToShow.lessons[count].lesson_id)
  // }

  return (
    <div className={styles.lesson}>
      <div className={styles.lesson__navBack}>
        <Link to="/login/courses/*">
          <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
          <span className={styles.lesson__navBack_text}>Список занятий</span>
        </Link>
      </div>
      <h1 className={styles.lesson__name}>{showLesson && showLesson.name}</h1>
      <div className={styles.lesson__blocks}>
        <div className={styles.lesson__wrap}>
          <div className={styles.lesson__card}>
            <h3 className={styles.lesson__name_mini}>{showLesson && showLesson.name}</h3>
            <div className={styles.lesson__content}>
              <span className={styles.lesson__desc}>{showLesson && parse(showLesson.description)}</span>
            </div>
            <div>
              <iframe width="100%" height="390" src={showLesson && showLesson.video}>
                {' '}
              </iframe>
            </div>
            <div className={styles.lesson__content}>
              <span className={styles.lesson__materials}>Материалы к занятию:</span>
              <div className={styles.lesson__download_container}>
                <div className={styles.lesson__dowload_wrap}>
                  <div className={styles.lesson__dowload_blackDiv}> </div>
                  <span>Домашнее задание.pdf</span>
                </div>
                <div className={styles.lesson__dowload_wrap}>
                  <span className={styles.lesson__download_size}>445 КБ</span>
                  <IconSvg width={17} height={17} viewBoxSize="0 0 17 17" path={arrDownPath} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.lesson__btns}>
            {/* <Link to={generatePath(Student.Lesson, { course_id: courseId, section_id: sectionId, lesson_id: lessonIdBack })}>
              <Button className={styles.lesson__btnPrev} text="Предыдущее" />
            </Link>
            <Link to={generatePath(Student.Lesson, { course_id: courseId, section_id: sectionId, lesson_id: lessonIdForward })}>
              <Button className={styles.lesson__btnNext} text="Следующее" />
            </Link> */}
            <Button className={styles.lesson__btnPrev} text="Предыдущее" />

            <Button className={styles.lesson__btnNext} text="Следующее" />
          </div>
        </div>
        <div className={styles.lesson__block}>
          <p className={styles.lesson__block_title}>Занятия модуля:</p>
          <div>
            {moduleToShow?.lessons.length &&
              moduleToShow?.lessons.map(({ name, lesson_id }: any, index: number) => (
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={handleClick}
                  id={lesson_id}
                  key={lesson_id}
                  className={index ? styles.lesson__item_active : styles.lesson__item}
                >
                  <IconSvg id={lesson_id.toString()} width={16} height={16} viewBoxSize="0 0 16 16" path={stackIconPath} />
                  <span id={lesson_id} className={styles.lesson__item_name}>
                    {name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
