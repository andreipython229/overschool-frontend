import { FC, memo } from 'react'

import { MobileCourseBlock } from 'MobilePages/MobileCoursesPage/MobileCourseBlock/MobileCourseBlock'
import { useFetchCoursesQuery } from '../../api/coursesServices'
import { Input } from '../../components/common/Input/Input/Input'
import { IconSvg } from '../../components/common/IconSvg/IconSvg'
import { searchIconPath } from '../../config/commonSvgIconsPath'
import { useDebouncedFilter } from '../../customHooks'
import { CoursesDataT } from '../../types/CoursesT'

import styles from './mobileCoursesPage.module.scss'

export const MobileCoursesPage: FC = memo(() => {
  const { data: coursesList } = useFetchCoursesQuery()

  const [term, filteredData, handleChangeTerm] = useDebouncedFilter(coursesList?.results as CoursesDataT[], 'name')

  return (
    <div className={styles.container}>
      <div className={styles.container_search}>
        <Input name="" type="search" value={term} onChange={handleChangeTerm} placeholder="Поиск по курсам и категориям">
          <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
        </Input>
      </div>

      <span className={styles.container_title}>Мои курсы</span>
      <div className={styles.course}>
        {coursesList &&
          filteredData?.map((course: any) => (
            <MobileCourseBlock
              id={course?.course_id}
              key={course?.course_id}
              name={course?.name}
              img={course?.photo}
              progress={'58'}
              desc={course?.description}
            />
          ))}
      </div>
    </div>
  )
})
