import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useFetchCourseQuery } from '../../../api/coursesServices'
import { Path } from '../../../enum/pathE'
import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { backArr } from '../../../components/Previous/config/svgIconPath'
import { stackIconPath, clickBoardCheckPath, signIconPath } from '../../../Pages/School/config/svgIconsPath'

import styles from './student_course_header.module.scss'

export const StudentCourseHeader: FC = () => {
  const { course_id: courseId } = useParams()
  const navigate = useNavigate()

  const { data: course } = useFetchCourseQuery(courseId as string)

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
        <div style={{ marginRight: '32px' }}>
          <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={stackIconPath} />
          <span style={{ marginLeft: '4px' }}>324 занятия</span>
        </div>
        <div style={{ marginRight: '32px' }}>
          <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={clickBoardCheckPath} />
          <span style={{ marginLeft: '4px' }}>85 заданий</span>
        </div>
        <div>
          <IconSvg width={16} height={16} viewBoxSize="0 0 16 16" path={signIconPath}>
            <circle cx="9.5" cy="4.5" r="0.5" fill="#BA75FF" />
          </IconSvg>
          <span>14 тестов</span>
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
