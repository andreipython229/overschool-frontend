import { ChangeEvent, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AllStudentsBlock } from '../../../components/AllStudentsBlock'
import { AddStudentModal } from 'components/Modal/StudentLogs/AddStudentModal/AddStudentModal'
import { CreateGroupModal } from 'components/Modal/StudentLogs/CreateGroupModal/CreateGroupModal'
import { StatisticHeader } from 'components/StatisticHeader/StatisticHeader'
import { StudentInfoGraphic } from 'Pages/School/StudentsStats/StudentInfoGraphic'
import { createGroupIconPath } from '../config/svgIconsPath'
import { StudentsTableBlock } from 'components/StudentsTableBlock'
import { SettingStudentTable } from 'components/Modal/SettingStudentTable'
import { useFetchStudentsGroupQuery } from 'api/studentsGroupService'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { StudentGroup } from 'Pages/School/StudentsStats/StudentsCountGroup'
import { studentsGroupsT } from '../../../types/studentsGroup'
import { ToggleButtonDropDown } from 'components/common/ToggleButtonDropDown'

import styles from './studentsStats.module.scss'
import { useBoolean } from '../../../customHooks/useBoolean'
import { Portal } from '../../../components/Modal/Portal'

export const StudentsStats = () => {
  const { course_id: courseId } = useParams()

  const [groups, setGroups] = useState<studentsGroupsT[]>([])
  const [studentEmail, setStudentEmail] = useState<string>('')

  const [studentModal, { onToggle: setStudentModal }] = useBoolean()
  const [isOpen, { onToggle: toggleIsOpen }] = useBoolean()
  const [addGroupModal, { off: offAddGroupModal, on: onAddGroupModal }] = useBoolean()
  const [toggleSettingModal, { off: offToggleSettingModal, on: onToggleSettingModal }] = useBoolean()

  const { data, isSuccess, isFetching } = useFetchStudentsGroupQuery()

  const onChangeStudentEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentEmail(e.currentTarget.value)
  }

  useEffect(() => {
    if (isSuccess) {
      setGroups(data?.results)
    }
  }, [isSuccess, isFetching])

  const groupsToShow = groups && groups.filter(group => courseId && group.course_id === +courseId)
  const reducedGroupsToShow = groupsToShow.slice(0, 2)
  const dataToRender = groupsToShow.length > 2 && isOpen ? groupsToShow : reducedGroupsToShow

  return (
    <div>
      <section className={styles.statistics}>
        <StatisticHeader />
        <div className={styles.statistics_new_student_wrapper}>
          <StudentInfoGraphic />
        </div>
      </section>
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
            const count = students[0]
            return <StudentGroup key={group_id} id={group_id as number} title={name} countStudent={count} />
          })}
          {groupsToShow.length > 2 && <ToggleButtonDropDown isOpen={isOpen} nameOfItems={'группы'} handleToggleHiddenBlocks={toggleIsOpen} />}
        </div>
      </section>
      <div
        className={styles.all_students}
        style={{
          fontWeight: 500,
          letterSpacing: '-0.01em',
          color: '#4D5766',
        }}
      >
        <AllStudentsBlock headerText={'Все ученики курса'} />
      </div>
      <StudentsTableBlock setShowModal={offToggleSettingModal} />

      {studentModal && (
        <Portal closeModal={setStudentModal}>
          <AddStudentModal setShowModal={setStudentModal} studentEmail={studentEmail} onChangeEmail={onChangeStudentEmail} />{' '}
        </Portal>
      )}
      {addGroupModal && (
        <Portal closeModal={onAddGroupModal}>
          <CreateGroupModal setShowModal={onAddGroupModal} courseId={courseId as string} />{' '}
        </Portal>
      )}

      {toggleSettingModal && (
        <Portal closeModal={onToggleSettingModal}>
          <SettingStudentTable setShowModal={onToggleSettingModal} />
        </Portal>
      )}
    </div>
  )
}
