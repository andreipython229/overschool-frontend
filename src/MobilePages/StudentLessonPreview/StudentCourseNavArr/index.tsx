import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { backArr } from 'components/Previous/config/svgIconPath'

import styles from '../lesson.module.scss'

export const StudentCourseNavArr: FC = () => {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate('../')} className={styles.lesson__navBack}>
      <IconSvg width={9} height={15} viewBoxSize="0 0 8 13" path={backArr} />
      <span className={styles.lesson__navBack_text}>Список занятий</span>
    </div>
  )
}
