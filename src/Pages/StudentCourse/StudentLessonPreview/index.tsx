import { useParams, Link, generatePath } from 'react-router-dom'

import { Student } from '../../../enum/pathE'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { useFetchModulesQuery } from '../../../api/modulesServices'
import { backArr } from '../../../components/Previous/config/svgIconPath'
import { arrDownPath } from '../config/svgIconPath'
import { Button } from '../../../components/common/Button/Button'
import { stackIconPath, clickBoardCheckPath, signIconPath } from '../../../Pages/School/config/svgIconsPath'

import styles from './lesson.module.scss'

export const StudentLessonPreview = () => {
  const { course_id: courseId, section_id: sectionId, lesson_id: lessonId } = useParams()
  const params = useParams()
  const { data: modules, isSuccess } = useFetchModulesQuery(courseId)

  console.log(modules, params)

  const moduleToShow = modules?.sections.find((module: any) => sectionId && module.section_id === +sectionId)
  const lessonToShow = moduleToShow?.lessons.find((lesson: any) => lessonId && lesson.lesson_id === +lessonId)
  const activeLessonIndex = moduleToShow?.lessons.findIndex((lesson: any) => lessonId && lesson.lesson_id === +lessonId)

  const lessonIdBack = moduleToShow?.lessons[activeLessonIndex - 1]?.lesson_id || lessonId
  const lessonIdForward = moduleToShow?.lessons[activeLessonIndex + 1]?.lesson_id || lessonId

  return (
    <div className={styles.lesson}>
      <div className={styles.lesson__navBack}>
        <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
        <span className={styles.lesson__navBack_text}>Список занятий</span>
      </div>
      <h1 className={styles.lesson__name}>{lessonToShow?.name}</h1>
      <div className={styles.lesson__blocks}>
        <div className={styles.lesson__wrap}>
          <div className={styles.lesson__card}>
            <h3 className={styles.lesson__name_mini}>{lessonToShow?.name}</h3>
            <div className={styles.lesson__content}>
              <span className={styles.lesson__desc}>Здусь будет текст занятия</span>
            </div>
            <div>
              <iframe width="100%" height="390" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
            </div>
            <div className={styles.lesson__content}>
              <span className={styles.lesson__materials}>Материалы к занятию:</span>
              <div className={styles.lesson__download_container}>
                <div className={styles.lesson__dowload_wrap}>
                  <div className={styles.lesson__dowload_blackDiv}></div>
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
                <div key={lesson_id} className={index === activeLessonIndex ? styles.lesson__item_active : styles.lesson__item}>
                  <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={stackIconPath} />
                  <span className={styles.lesson__item_name}>{name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
