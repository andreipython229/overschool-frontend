import React, { memo, useState, FC, useEffect } from 'react'

import { IconSvg } from '../../../components/common/IconSvg/IconSvg'
import { Input } from '../../../components/common/Input/Input/Input'
import { CoursesMiniCard } from './CoursesMiniCard'
import { useDebouncedFilter } from '../../../customHooks'
import { ToggleButtonDropDown } from '../../../components/common/ToggleButtonDropDown'
import { searchIconPath } from '../../../config/commonSvgIconsPath'
import { searchCourseBlockT } from '../../../types/pageTypes'
import { useAppSelector } from 'store/hooks'
import { selectUser } from 'selectors'

import styles from '../courses_stats.module.scss'
import {StudentsPerCourse} from "../../../components/StudentsTable/StudentsPerCourse";
import {StudentsStats} from "../../School/StudentsStats/StudentsStats";

export const SearchCoursesBlock: FC<searchCourseBlockT> = memo(({ groups, courses }) => {
  const { userId } = useAppSelector(selectUser)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [term, filteredData, handleChangeTerm] = useDebouncedFilter(courses, 'name')
  const [courseID, setCourseID] = useState('')
    const [activeGroup, setActiveGroup] = useState<number>(0)

  const handleClick = (id: number) => {
    setActiveGroup(activeGroup === id ? -100 : id)
  }

  const handleToggleHiddenBlocks = (): void => {
    setIsOpen(!isOpen)
  }

  const handleClickID = (pr: number) => {
      setCourseID(String(pr))
      console.log(courseID)
  }

  useEffect(() => {
      setActiveGroup(0)
  }, [courseID])

  return (
    <div className={styles.container}>
        <>
          <Input name="" type="search" value={term} onChange={handleChangeTerm} placeholder="Поиск по курсам">
            <IconSvg width={20} height={20} viewBoxSize="0 0 20 20" path={searchIconPath} />
          </Input>

          <div className={styles.container_courses}>
        <h4>Курсы</h4>
      </div>

          <div className={styles.courses_card_block}>
            {filteredData
              ?.filter(({ course_id }) => course_id !== 247 || userId === 154)
              .map(({ photo, name, course_id }) => (
                  <div style={{cursor: "pointer"}} key={course_id} onClick={() => handleClickID(course_id)}>
                <CoursesMiniCard click={handleClick} active={activeGroup === course_id} groups={groups} photo={photo} name={name} courseId={course_id} />
                </div>
              ))}
          </div>
        </>


        <StudentsStats course_id={courseID}/>

    </div>
  )
})
