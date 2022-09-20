import { ChangeEvent, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AddStudentModal } from 'components/Modal/StudentLogs/AddStudentModal/AddStudentModal'
import { CreateGroupModal } from 'components/Modal/StudentLogs/CreateGroupModal/CreateGroupModal'
import { StatisticHeader } from 'components/StatisticHeader/StatisticHeader'
import { StudentInfoGraphic } from 'Pages/School/Navigations/StudentsStats/StudentInfoGraphic'
import { createGroupIconPath } from '../../config/svgIconsPath'
import { StudentsTableBlock } from 'components/StudentsTableBlock'
import { settingsItemsList } from '../../../CoursesStats/config/settingsItemList'
import { SettingStudentTable } from 'components/Modal/SettingStudentTable/'
import { useFetchStudentsGroupQuery } from 'api/studentsGroupService'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { StudentGroup } from 'Pages/School/Navigations/StudentsStats/StudentsCountGroup'
import { studentsGroupT } from '../../../../types/studentsGroup'
import { ToggleButtonDropDown } from 'components/common/ToggleButtonDropDown'

import styles from './studentsStats.module.scss'

export type SettingItemT = {
  id: number
  order: number
  name: string
  checked: boolean
}

export const StudentsStats = () => {
  const { course_id: courseId } = useParams()

  const [groups, setGroups] = useState<studentsGroupT[]>([])
  const [studentModal, setStudentModal] = useState<boolean>(false)
  const [addGroupModal, setAddGroupModal] = useState<boolean>(false)
  const [studentEmail, setStudentEmail] = useState<string>('')
  const [settingList, setSettingsList] = useState<SettingItemT[]>(settingsItemsList)
  const [toggleSettingModal, setToggleSettingModal] = useState<boolean>(false)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggleHiddenBlocks = (): void => {
    setIsOpen(!isOpen)
  }

  const { data, isSuccess, isFetching } = useFetchStudentsGroupQuery()

  const onChangeStudentEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentEmail(e.currentTarget.value)
  }

  useEffect(() => {
    if (isSuccess) {
      setGroups(data)
    }
  }, [isSuccess, isFetching])

  const groupsToShow = groups.filter(group => courseId && group.course_id === +courseId)
  const reducedGroupsToShow = groupsToShow.slice(0, 2)
  const dataToRender = groupsToShow.length > 2 && isOpen ? groupsToShow : reducedGroupsToShow

  return (
    <div>
      {studentModal && <AddStudentModal setShowModal={setStudentModal} studentEmail={studentEmail} onChangeEmail={onChangeStudentEmail} />}
      {addGroupModal && <CreateGroupModal setShowModal={setAddGroupModal} courseId={courseId as string} />}

      <section className={styles.statistics}>
        <StatisticHeader />
        <div className={styles.statistics_new_student_wrapper}>
          <StudentInfoGraphic />
        </div>
      </section>
      <section className={styles.students_group}>
        <div className={styles.students_group_header}>
          <h4 className={styles.students_group_header_title}>Группы учеников</h4>
          <div onClick={() => setAddGroupModal(true)} className={styles.students_group_header_add_group_btn}>
            <IconSvg width={22} height={18} viewBoxSize="0 0 22 18" path={createGroupIconPath} />
            Создать новую группу
          </div>
        </div>
        <div className={styles.students_group_content_wrapper}>
          {dataToRender?.map(({ name, students, group_id }: studentsGroupT) => {
            const count = students[0]
            const studentsCount = count === 1 || count % 10 === 1 ? ` ${count} ученик` : `${count} ученика`
            return <StudentGroup key={group_id} id={group_id as number} title={name} countStudent={studentsCount} />
          })}
          {groupsToShow.length > 2 && (
            <ToggleButtonDropDown isOpen={isOpen} nameOfItems={'группы'} handleToggleHiddenBlocks={handleToggleHiddenBlocks} />
          )}
        </div>
      </section>
      <p
        className={styles.all_students}
        style={{
          fontWeight: 500,
          letterSpacing: '-0.01em',
          color: '#4D5766',
        }}
      >
        Все ученики курса
      </p>
      <StudentsTableBlock settingList={settingsItemsList} setToggleSettingModal={setToggleSettingModal} />
      {toggleSettingModal && <SettingStudentTable setShowModal={setToggleSettingModal} settingList={settingList} setSettingsList={setSettingsList} />}
    </div>
  )
}
