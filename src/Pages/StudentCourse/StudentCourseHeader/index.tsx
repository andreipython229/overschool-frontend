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
      <div style={{ display: 'flex', position: 'absolute', zIndex: '9999', bottom: '10%', left: '44px', color: '#fff' }}>
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
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'absolute', bottom: '10%', right: '3%', color: '#fff' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', border: '16px solid #FFFFFF', borderRadius: '50%', width: '64px', height: '64px' }}>
          75%
        </div>
        <div style={{ letterSpacing: '0.01em', fontWeight: 400, fontSize: '10px', lineHeight: '12px', marginTop: '3px' }}>
          <span>В процессе . </span>
          <span>295/324</span>
        </div>
      </div>
    </div>
  )
}
