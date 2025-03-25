import { memo, useState, FC, useEffect } from 'react'

import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../components/common/Input/Input/Input'
import { useDebouncedFilter } from '../../../customHooks'
import { ToggleButtonDropDown } from '../../../components/common/ToggleButtonDropDown'
import { searchIconPath } from '../../../config/commonSvgIconsPath'
import { searchCourseBlockT } from '../../../types/pageTypes'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'

import styles from '../courses_stats.module.scss'
import { CourseMiniCard } from 'components/CourseMiniCard'

export const SearchCoursesBlock: FC<searchCourseBlockT> = memo(({ groups, courses }) => {
  const { userId } = useAppSelector(selectUser)
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
      {isOpen ? (
        <>
          <Input name="" type="search" value={term} onChange={handleChangeTerm} placeholder="Поиск по курсам">
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
          </Input>
          <div className={styles.courses_card_block}>
            {filteredData
              ?.filter(({ course_id }) => course_id !== 247 || userId === 154)
              .map(({ photo, name, course_id }) => (
                <CourseMiniCard key={course_id} groups={groups} title={name} courseId={course_id} />
              ))}
          </div>
        </>
      ) : (
        <div className={styles.courses_card_block}>
          {filteredData &&
            filteredData
              .slice(0, 3)
              .filter(({ course_id }) => course_id !== 247 || userId === 154)
              .map(({ photo, name, course_id }) => <CourseMiniCard key={course_id} groups={groups} title={name} courseId={course_id} />)}
        </div>
      )}
      <div className={styles.container_courses_dropdown}>
        <ToggleButtonDropDown isOpen={isOpen} nameOfItems={'курсы'} handleToggleHiddenBlocks={handleToggleHiddenBlocks} />
      </div>
    </div>
  )
})
