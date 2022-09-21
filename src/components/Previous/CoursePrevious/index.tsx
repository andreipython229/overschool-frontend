import { FC, memo } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '../../common/Button/Button'
import { Path } from '../../../enum/pathE'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { backArr } from '../config/svgIconPath'
import { useFetchCourseQuery, usePatchCoursesMutation } from 'api/coursesServices'
import { patchData } from 'utils/patchData'

import styles from '../previou.module.scss'

export const CoursePrevious: FC = memo(() => {
  const params: any = useParams()
  const courseId = params['*']?.match(/\d+/)[0]
  const [update] = usePatchCoursesMutation()
  const { data } = useFetchCourseQuery(courseId as string)

  const isPublishedCourse = () => {
    patchData(data, 'course_id', 'public', 'О', update)
  }

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

      <div className={styles.previous_btn}>
        {data?.public === 'Н' && (
          <Button
            variant={'primary'}
            style={{
              fontSize: '12px',
              fontWeight: '500',
            }}
            text={'Опубликовать курс'}
            onClick={isPublishedCourse}
          />
        )}
      </div>
    </div>
  )
})
