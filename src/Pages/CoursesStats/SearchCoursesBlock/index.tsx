import { useState } from 'react'

import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../components/common/Input/Input/Input'
import { searchSvgIcon } from '../../../constants/iconSvgConstants'
import { CoursesMiniCard } from './CoursesMiniCard'
import { allCoursesSelector } from '../../../selectors'
import { useAppSelector } from '../../../store/hooks'
import { useFilterData } from '../../../customHooks/useFilterData'
import { ToggleButtonDropDown } from '../../../components/common/ToggleButtonDropDown'
import { CoursesT } from '../../../store/redux/courses/slice'

import styles from '../courses_stats.module.scss'

export const SearchCoursesBlock = () => {
  const { courses } = useAppSelector(allCoursesSelector)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggleHiddenBlocks = (): void => {
    setIsOpen(!isOpen)
  }

  const [nameCourses, foundCourses, filterData] = useFilterData(courses, 'name')

  return (
    <div className={styles.container}>
      <h4>Курсы</h4>
      {isOpen && (
        <>
          <Input name="" type="search" value={nameCourses} onChange={filterData} placeholder="Поиск по курсам">
            <IconSvg
              width={20}
              height={20}
              viewBoxSize="0 0 20 20"
              d={searchSvgIcon}
              stroke="#D1D5DB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Input>
          <div className={styles.courses_card_block}>
            {foundCourses?.map(({ photo_url, name, course_id }: any) => (
              <CoursesMiniCard key={course_id} photo_url={photo_url} name={name} course_id={course_id} />
            ))}
          </div>
        </>
      )}
      <ToggleButtonDropDown isOpen={isOpen} handleToggleHiddenBlocks={handleToggleHiddenBlocks} />
    </div>
  )
}
