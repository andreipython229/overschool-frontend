import { memo, useState, FC } from 'react'

import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../components/common/Input/Input/Input'
import { CoursesMiniCard } from './CoursesMiniCard'
import { useDebouncedFilter } from '../../../customHooks/useDebouncedFilter'
import { ToggleButtonDropDown } from '../../../components/common/ToggleButtonDropDown'
import { searchIconPath } from '../../../config/commonSvgIconsPath'
import { searchCourseBlockT } from '../../pageTypes'

import styles from '../courses_stats.module.scss'

export const SearchCoursesBlock: FC<searchCourseBlockT> = memo(({ groups, courses }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [term, filteredData, handleChangeTerm] = useDebouncedFilter(courses, 'name')

  const handleToggleHiddenBlocks = (): void => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_courses}>
        <h4>Курсы</h4>
      </div>
      {isOpen && (
        <>
          <Input name="" type="search" value={term} onChange={handleChangeTerm} placeholder="Поиск по курсам">
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
          </Input>
          <div className={styles.courses_card_block}>
            {filteredData?.map(({ photo_url, name, course_id }) => (
              <CoursesMiniCard key={course_id} groups={groups} photo_url={photo_url} name={name} courseId={course_id} />
            ))}
          </div>
        </>
      )}
      <div className={styles.container_courses_dropdown}>
        <ToggleButtonDropDown isOpen={isOpen} nameOfItems={'курсы'} handleToggleHiddenBlocks={handleToggleHiddenBlocks} />
      </div>
    </div>
  )
})
