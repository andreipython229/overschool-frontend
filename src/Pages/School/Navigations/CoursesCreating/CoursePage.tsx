import { FC, memo } from 'react'

import { useAppDispatch } from '../../../../store/hooks'
import { CoursesCard } from './CoursesCard'
import { showModal } from '../../../../store/redux/modal/slice'
import { IconSvg } from '../../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../../components/common/Input/Input/Input'
import { useFilterData } from '../../../../customHooks/useFilterData'
import { CoursesT } from '../../../../types/CoursesT'
import { searchIconPath } from 'config/commonSvgIconsPath'

import styles from 'Pages/School/Navigations/CoursesCreating/coursePage.module.scss'

type CoursePagePropsT = {
  setShowModal: () => void
  courses: CoursesT[]
}

export const CoursePage: FC<CoursePagePropsT> = ({ setShowModal, courses }) => {
  const dispatch = useAppDispatch()

  const [nameCourses, foundCourses, filterData] = useFilterData(courses, 'name')

  const dispatchHandlerModal = () => {
    setShowModal()
    dispatch(showModal(true))
  }

  return (
    <div className={styles.container}>
      <Input name="" type="search" value={nameCourses} onChange={filterData} placeholder="Поиск по курсам">
        <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
      </Input>
      <div className={styles.course}>
        {courses.length !== 0 &&
          foundCourses?.map((course: any) => (
            <CoursesCard
              key={course.course_id}
              created_at={course.created_at}
              course_id={course?.course_id}
              published={course.published}
              name={course.name}
              description={course.description}
              photo_url={course.photo_url}
              author_id={course.author_id}
            />
          ))}

        <div onClick={dispatchHandlerModal} className={styles.course_card}>
          <div className={styles.course_addCourse}>
            <span>Создать курс</span>
          </div>
        </div>
      </div>
    </div>
  )
}
