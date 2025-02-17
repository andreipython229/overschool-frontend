import React, { useState, useCallback, FC } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { CreateGroupModal } from 'components/Modal/StudentLogs/CreateGroupModal/CreateGroupModal'
import { StudentsPerCourse } from 'components/StudentsTable/StudentsPerCourse'
import { useFetchStudentsGroupByCourseQuery } from 'api/studentsGroupService'
import { studentsGroupsT } from '../../../types/studentsGroup'
import { ToggleButtonDropDown } from 'components/common/ToggleButtonDropDown'
import { useBoolean } from '../../../customHooks'
import { Portal } from '../../../components/Modal/Portal'
import { headerUserRoleName } from '../../../config/headerUserRoleName'

import styles from './studentsStats.module.scss'
import { Path } from 'enum/pathE'

import { useAppSelector } from 'store/hooks'
import { selectUser } from '../../../selectors'
import { StudentGroupMiniCard } from 'components/StudentGroupMiniCard'
import { Button } from '../../../components/common/Button/Button'
import { StudentsStatsT } from '../../../types/pageTypes'

export const StudentsStats: FC<StudentsStatsT> = ({ course_id }) => {
  const { course_id: course_ID } = useParams()
  const courseId = course_ID && course_ID.length > 0 ? course_ID : course_id
  const { role } = useAppSelector(selectUser)

  const [hideStats, setHideStats] = useState<boolean>(true)
  const navigate = useNavigate()
  const school = window.location.href.split('/')[4]
  const [isOpen, { onToggle: toggleIsOpen }] = useBoolean()
  const [addGroupModal, { off: offAddGroupModal, on: onAddGroupModal }] = useBoolean()
  const { data } = useFetchStudentsGroupByCourseQuery({ id: String(courseId), schoolName: school })
  const [activeGroup, setActiveGroup] = useState<number>(0)

  const handleHideStats = useCallback(() => {
    setHideStats(!hideStats)
  }, [hideStats])

  const handleClick = (id: number) => {
    setActiveGroup(activeGroup === id ? -100 : id)
  }

  const reducedGroupsToShow = data?.results.slice(0, 6)
  const dataToRender = data?.results && data?.results.length > 6 && isOpen ? data?.results : reducedGroupsToShow

  return (
    <div className={styles.students}>
      <section className={styles.students_group}>
        <div className={styles.students_group_header}>
          <p className={styles.students_group_header_title}>Группы учеников</p>

          {headerUserRoleName[role] === 'Администратор' && (
            <div className={styles.btn}>
              <Button
                onClick={offAddGroupModal}
                className={styles.students_group_header_add_group_btn}
                text={'Создать новую группу'}
                variant={'newPrimary'}
              ></Button>

              <Button
                onClick={() => navigate(generatePath(Path.School + Path.Settings + 'employees/', { school_name: school }))}
                className={styles.students_group_header_add_teacher_btn}
                text={'Добавить менторов в школу'}
                variant={'newPrimary'}
              ></Button>
            </div>
          )}
        </div>
      </section>

      {dataToRender && (
        <div>
          <div className={styles.container_groups}>
            <div
              className={styles.groups_card_block}
              style={dataToRender.length < 3 ? { justifyContent: 'flex-start' } : { justifyContent: 'space-between' }}
            >
              {dataToRender?.map(({ name, students, group_id, type }: studentsGroupsT) => {
                const count = students?.length
                return (
                  <StudentGroupMiniCard
                    active={activeGroup === group_id}
                    key={group_id}
                    id={group_id as number}
                    click={handleClick}
                    title={name}
                    countStudent={count}
                    type={type}
                    courseId={Number(courseId)}
                  />
                )
                // return <StudentGroup key={group_id} id={group_id as number} title={name} countStudent={count} type={type} courseId={Number(courseId)}/>
              })}
            </div>
          </div>
          <div className={styles.container_groups_dropdown}>
            {data?.results && data?.results?.length > 6 && (
              <ToggleButtonDropDown isOpen={isOpen} nameOfItems={'группы'} handleToggleHiddenBlocks={toggleIsOpen} />
            )}
          </div>
        </div>
      )}
      <StudentsPerCourse courseID={course_id} />
      {addGroupModal && (
        <Portal closeModal={onAddGroupModal}>
          <CreateGroupModal setShowModal={onAddGroupModal} courseId={courseId as string} />{' '}
        </Portal>
      )}
    </div>
  )
}
