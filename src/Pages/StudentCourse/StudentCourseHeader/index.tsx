import { FC, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useFetchCourseQuery } from '../../../api/coursesServices'
import { useFetchModulesQuery } from '../../../api/modulesServices'
import { Path } from '../../../enum/pathE'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { backArr } from '../../../components/Previous/config/svgIconPath'
import { lessonT } from '../../../types/sectionT'
import { lessonSvgMapper } from '../../../config/LessonsMaper'

import styles from './student_course_header.module.scss'

export const StudentCourseHeader: FC = () => {
  const { course_id: courseId } = useParams()
  const navigate = useNavigate()

  const { data: course } = useFetchCourseQuery(courseId as string)
  const { data: modules, isSuccess } = useFetchModulesQuery(courseId as string)

  const [modulesData, setModulesData] = useState(modules)

  const arrOfLessons = modulesData?.sections.reduce((acc: lessonT[], item: any) => {
    return [...acc, ...item.lessons]
  }, [])

  const countOfLessons = arrOfLessons?.reduce(
    (acc: { [key: string]: number }, item: lessonT) => ((acc[item.type] = (acc[item.type] || 0) + 1), acc),
    {},
  )

  useEffect(() => {
    if (isSuccess) {
      setModulesData(modules)
    }
  }, [isSuccess])

  return (
    <div className={styles.previous}>
      <img className={styles.background_image_course} src={course?.photo_url} alt="" />
      <div className={styles.previous_bcgrShadow}> </div>
      <div onClick={() => navigate(`/login/${Path.Courses}`)} className={styles.back_all_course}>
        <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
        <span>Все курсы</span>
      </div>
      <div className={styles.previous_onlineCourses}>Онлайн-курс</div>
      <div className={styles.previous_title_name}>{course?.name}</div>
      <div className={styles.previous_courseInfo}>
        <div style={{ marginRight: '32px', display: 'flex', alignItems: 'center' }}>
          {lessonSvgMapper['lesson']}
          <span style={{ marginLeft: '4px' }}>{countOfLessons && countOfLessons['lesson']} занятия</span>
        </div>
        <div style={{ marginRight: '32px', display: 'flex', alignItems: 'center' }}>
          {lessonSvgMapper['homework']}
          <span style={{ marginLeft: '4px' }}>{countOfLessons && countOfLessons['homework']} заданий</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {lessonSvgMapper['test']}
          <span>{countOfLessons && countOfLessons['test']} тестов</span>
        </div>
      </div>
      <div className={styles.previous_progress}>
        <div className={styles.previous_progress_graph}>75%</div>
        <div className={styles.previous_progress_info}>
          <span>В процессе . </span>
          <span>295/324</span>
        </div>
      </div>
    </div>
  )
}
