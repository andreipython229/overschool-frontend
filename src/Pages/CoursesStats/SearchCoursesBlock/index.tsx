import { memo, useState, FC } from 'react'

import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../components/common/Input/Input/Input'
import { CoursesMiniCard } from './CoursesMiniCard'
import { useFilterData } from '../../../customHooks/useFilterData'
import { ToggleButtonDropDown } from '../../../components/common/ToggleButtonDropDown'
import { searchIconPath } from '../../../config/commonSvgIconsPath'
import { searchCourseBlockT } from '../../pageTypes'

import styles from '../courses_stats.module.scss'

export const SearchCoursesBlock: FC<searchCourseBlockT> = memo(({ groups, courses }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggleHiddenBlocks = (): void => {
    setIsOpen(!isOpen)
  }

  const [nameCourses, foundCourses, filterData] = useFilterData(courses, 'name')

  return (
    <div className={styles.container}>
    <div className={styles.container_courses}>
      <h4>Курсы</h4>
      <div className={styles.container_courses_dropdown} >
            <ToggleButtonDropDown isOpen={isOpen} nameOfItems={'курсы'} handleToggleHiddenBlocks={handleToggleHiddenBlocks} />
      </div>
      </div>
      {isOpen && (
        <>
          <Input name="" type="search" value={nameCourses} onChange={filterData} placeholder="Поиск по курсам">
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
          </Input>
          <div className={styles.courses_card_block}>
            {foundCourses?.map(({ photo_url, name, course_id }: any) => (
              <CoursesMiniCard key={course_id} groups={groups} photo_url={photo_url} name={name} courseId={course_id} />
            ))}
          </div>
        </>
      )}
    </div>
  )
})
