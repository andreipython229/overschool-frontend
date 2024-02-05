import { useState, useCallback } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'

import { CreateGroupModal } from 'components/Modal/StudentLogs/CreateGroupModal/CreateGroupModal'
import { createGroupIconPath, publishedIconPath, studentIconPath, studentScatterIconPath } from '../config/svgIconsPath'
import { StudentsPerCourse } from 'components/StudentsTable/StudentsPerCourse'
import { useFetchStudentsGroupByCourseQuery } from 'api/studentsGroupService'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { StudentGroup } from 'Pages/School/StudentsStats/StudentsCountGroup'
import { studentsGroupsT } from '../../../types/studentsGroup'
import { ToggleButtonDropDown } from 'components/common/ToggleButtonDropDown'
import { useBoolean } from '../../../customHooks'
import { Portal } from '../../../components/Modal/Portal'
import { headerUserRoleName } from '../../../config/headerUserRoleName'

import styles from './studentsStats.module.scss'
import { tableBallsStarPath } from 'config/commonSvgIconsPath'
import { Path } from 'enum/pathE'
import { useAppSelector } from 'store/hooks'
import { schoolNameSelector } from 'selectors'
import {selectUser} from '../../../selectors'

export const StudentsStats = () => {
  const { course_id: courseId } = useParams()

  const {role} = useAppSelector(selectUser)
  
  const [hideStats, setHideStats] = useState<boolean>(true)

  const navigate = useNavigate()
  const school = window.location.href.split('/')[4]
  const [isOpen, { onToggle: toggleIsOpen }] = useBoolean()
  const [addGroupModal, { off: offAddGroupModal, on: onAddGroupModal }] = useBoolean()

  const { data } = useFetchStudentsGroupByCourseQuery({id: String(courseId), schoolName: school})

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
          {(headerUserRoleName[role] === 'Администратор') && (
          <div style={{display: 'flex'}}>
            <div onClick={offAddGroupModal} className={styles.students_group_header_add_group_btn}>
              <IconSvg width={22} height={18} viewBoxSize="0 0 22 18" path={createGroupIconPath} />
              Создать новую группу
            </div>
            <div onClick={() => navigate(generatePath(Path.School + Path.Settings + 'employees/', {school_name: school}))} className={styles.students_group_header_add_teacher_btn}>
              <IconSvg width={22} height={18} viewBoxSize="0 0 22 18" path={tableBallsStarPath} />
              Добавить менторов в школу
            </div>
          </div>)}
        </div>
        <div className={styles.students_group_content_wrapper}>
          {dataToRender?.map(({ name, students, group_id }: studentsGroupsT) => {
            const count = students?.length
            return <StudentGroup key={group_id} id={group_id as number} title={name} countStudent={count} courseId={Number(courseId)}/>
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
