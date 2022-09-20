import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '../../common/Button/Button'
import { Path } from '../../../enum/pathE'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { backArr } from '../config/svgIconPath'
import { useFetchCourseQuery } from '../../../api/coursesServices'
import { stackIconPath, clickBoardCheckPath, signIconPath } from '../../../Pages/School/config/svgIconsPath'

import styles from '../previou.module.scss'

export const CoursePrevious: FC = () => {

  const params: any = useParams()
  const courseId = params['*']?.match(/\d/)[0] 

  const { data } = useFetchCourseQuery(courseId as string)

  return (
    <div className={styles.previous}>
      <img className={styles.background_image_course} src={data?.photo_url} alt="" />
      <div className={styles.previous_bcgrShadow}> </div>
      <Link className={styles.back_all_course} to={`${Path.Courses}`}>
        <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
        <span>Все курсы</span>
      </Link>
      <div className={styles.previous_onlineCourses}>Онлайн-курс</div>
      <div className={styles.previous_title_name}>{data?.name}</div>
      {/* <div style={{ display: 'flex', position: 'absolute', zIndex: '9999', bottom: '10%', left: '3%', color: '#fff' }}>
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
        <div>
          <span>В процессе . </span>
          <span>295/324</span>
        </div>
      </div> */}

      <div className={styles.previous_btn}>
        <Button
          variant={'primary'}
          style={{
            fontSize: '12px',
            fontWeight: '500',
          }}
          text={'Опубликовать курс'}
          // onClick={onClick}
        />
      </div>
    </div>
  )
}
