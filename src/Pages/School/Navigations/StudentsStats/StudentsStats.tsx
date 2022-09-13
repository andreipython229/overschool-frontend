import { ChangeEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { IconSvg } from '../../../../components/common/IconSvg/IconSvg'
import { AddStudentModal } from 'components/Modal/StudentLogs/AddStudentModal/AddStudentModal'
import { CreateGroupModal } from 'components/Modal/StudentLogs/CreateGroupModal/CreateGroupModal'
import { StatisticHeader } from 'components/StatisticHeader/StatisticHeader'
import { StudentInfoGraphic } from 'Pages/School/Navigations/StudentsStats/StudentInfoGraphic'
import { StudentLogs } from 'enum/pathE'
import { SettingsGroupModal } from 'components/Modal/StudentLogs/SettingsGroupModal/SettingsGroupModal'
import { studentScatterIconPath } from '../../config/svgIconsPath'

import styles from './studentsStats.module.scss'

export const StudentsStats = () => {
  const { pathname } = useLocation()
  const [studentModal, setStudentModal] = useState<boolean>(false)
  const [addGroupModal, setAddGroupModal] = useState<boolean>(false)
  const [settingsGroupModal, setSettingsGroupModal] = useState<boolean>(false)
  const [studentEmail, setStudentEmail] = useState<string>('')
  const [nameGroup, setNameGroup] = useState<string>('')

  const onChangeStudentEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentEmail(e.currentTarget.value)
  }

  const showStudentModal = () => {
    setStudentModal(!studentModal)
  }

  const showGroupModal = () => {
    setAddGroupModal(!addGroupModal)
  }
  const showSettingsModal = () => {
    setSettingsGroupModal(!settingsGroupModal)
  }

  const addNameGroup = (e: ChangeEvent<HTMLInputElement>) => {
    setNameGroup(e.currentTarget.value)
  }

  const groupSettingUrl = pathname.includes(StudentLogs.GroupSettings)

  return (
    <div>
      {studentModal && <AddStudentModal setShowModal={setStudentModal} studentEmail={studentEmail} onChangeEmail={onChangeStudentEmail} />}
      {addGroupModal && <CreateGroupModal setShowModal={setAddGroupModal} nameGroup={nameGroup} addNameGroup={addNameGroup} />}
      {settingsGroupModal && <SettingsGroupModal closeModal={showSettingsModal} />}

      <section className={styles.statistics}>
        <StatisticHeader />
        <div className={styles.statistics_new_student_wrapper}>
          <StudentInfoGraphic />
          <div className={styles.statistics_new_student_wrapper_new_students}>
            <h4 className={styles.statistics_new_student_wrapper_new_students_title}>Новых учеников</h4>
            <p className={styles.statistics_new_student_wrapper_new_students_amount}>463</p>
            <div className={styles.statistics_new_student_wrapper_new_students_graph}>
              <IconSvg width={212} height={28} viewBoxSize={'0 0 212 28'} path={studentScatterIconPath}>
                <defs>
                  <linearGradient id="paint0_linear_283_4115" x1="106" y1="7" x2="106" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B6B6B6" />
                    <stop offset="1" stopColor="#B6B6B6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </IconSvg>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_wrapper}>
              <p className={styles.statistics_new_student_wrapper_new_students_info_wrapper_info}>Предыдущий период (31 день)</p>
            </div>
            <div className={styles.statistics_new_student_wrapper_new_students_info_btn}>i</div>
          </div>
        </div>
      </section>
      {/*{groupSettingUrl ? null : <StudentsTableBlock showGroupModal={showGroupModal} />}*/}
      {/*<StudentInfoTable showStudentModal={showStudentModal} />*/}
    </div>
  )
}
