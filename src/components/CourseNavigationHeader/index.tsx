import { FC } from 'react'
import styles from './courseNavigationHeader.module.scss'
import { Button } from 'components/common/Button/Button'
import { generatePath, useNavigate } from 'react-router-dom'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { arrowLeftIconPath } from 'config/commonSvgIconsPath'
import { sectionsT } from 'types/sectionT'
import { Path } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { schoolNameSelector } from 'selectors'

interface ICourseHeader {
  course: sectionsT
}

export const CourseNavigationHeader: FC<ICourseHeader> = ({ course }) => {
  const navigate = useNavigate()
  const schoolName = useAppSelector(schoolNameSelector)
  return (
    <div className={styles.navigator}>
      <div>
        <Button
          text={'На главную'}
          onClick={() => schoolName && navigate(generatePath(Path.School + Path.Courses, { school_namecourses: schoolName }))}
          variant="emptyInside"
        >
          <IconSvg viewBoxSize="0 0 24 24" height={24} width={24} path={arrowLeftIconPath} />
        </Button>
      </div>
      <p className={styles.navigator_course}>{course.course_name}</p>
      <span />
    </div>
  )
}
