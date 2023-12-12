import { generatePath, useNavigate } from 'react-router-dom'

import { Path } from '../../enum/pathE'

import styles from './pageNotFound.module.scss'
import { RoleE } from '../../enum/roleE'
import { useAppSelector } from '../../store/hooks'
import { schoolNameSelector, selectUser } from '../../selectors'

export const PageNotFound = () => {
  const navigate = useNavigate()
  const { role } = useAppSelector(selectUser)
  const schoolName = useAppSelector(schoolNameSelector)
  const goBack = () => {
    const pathLink =
      schoolName && role
        ? generatePath(role === RoleE.Teacher ? `${Path.School}${Path.CourseStudent}` : `${Path.School}${Path.Courses}`, {
            school_name: schoolName,
          })
        : generatePath(Path.InitialPage)
    navigate(pathLink)
  }

  return (
    <div className={styles.main}>
      <div className={styles.main_container}>
        <p> Извините, но страница не существует или не найдена.</p>
        <button className={styles.main_link} onClick={goBack}>
          Back to start
        </button>
      </div>
    </div>
  )
}
