import { useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { CreateGroupModal } from 'components/Modal/StudentLogs/CreateGroupModal/CreateGroupModal'
import { createGroupIconPath } from '../config/svgIconsPath'
import { StudentsPerCourse } from 'components/StudentsTable/StudentsPerCourse'
import { useFetchStudentsGroupByCourseQuery } from 'api/studentsGroupService'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { StudentGroup } from 'Pages/School/StudentsStats/StudentsCountGroup'
import { studentsGroupsT } from '../../../types/studentsGroup'
import { ToggleButtonDropDown } from 'components/common/ToggleButtonDropDown'
import { useBoolean } from '../../../customHooks'
import { Portal } from '../../../components/Modal/Portal'

import styles from './studentsStats.module.scss'

export const StudentsStats = () => {
  const { course_id: courseId } = useParams()

  const [hideStats, setHideStats] = useState<boolean>(true)

  const [isOpen, { onToggle: toggleIsOpen }] = useBoolean()
  const [addGroupModal, { off: offAddGroupModal, on: onAddGroupModal }] = useBoolean()

  const { data } = useFetchStudentsGroupByCourseQuery(`${courseId}`)

  const handleHideStats = useCallback(() => {
    setHideStats(!hideStats)
  }, [hideStats])

  const reducedGroupsToShow = data?.results.slice(0, 2)
  const dataToRender = data?.results && data?.results.length > 2 && isOpen ? data?.results : reducedGroupsToShow

  return (
    <div>
      {/*<section className={styles.statistics}>*/}
      {/*  <StatisticHeader hideStats={hideStats} handleHideStats={handleHideStats} />*/}
      {/*  {hideStats && (*/}
      {/*    <div className={styles.statistics_new_student_wrapper}>*/}
      {/*      <StudentInfoGraphic courseId={courseId} />*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</section>*/}
      <section className={styles.students_group}>
        <div className={styles.students_group_header}>
          <p className={styles.students_group_header_title}>Группы учеников</p>
          <div onClick={offAddGroupModal} className={styles.students_group_header_add_group_btn}>
            <IconSvg width={22} height={18} viewBoxSize="0 0 22 18" path={createGroupIconPath} />
            Создать новую группу
          </div>
        </div>
        <div className={styles.students_group_content_wrapper}>
          {dataToRender?.map(({ name, students, group_id }: studentsGroupsT) => {
            const count = students?.length
            return <StudentGroup key={group_id} id={group_id as number} title={name} countStudent={count} />
          })}
          {data?.results && data?.results?.length > 2 && (
            <ToggleButtonDropDown isOpen={isOpen} nameOfItems={'группы'} handleToggleHiddenBlocks={toggleIsOpen} />
          )}
        </div>
      </section>

      <StudentsPerCourse />
      {addGroupModal && (
        <Portal closeModal={onAddGroupModal}>
          <CreateGroupModal setShowModal={onAddGroupModal} courseId={courseId as string} />{' '}
        </Portal>
      )}
    </div>
  )
}
