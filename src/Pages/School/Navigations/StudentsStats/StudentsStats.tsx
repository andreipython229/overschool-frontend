import { ChangeEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { AddStudentModal } from 'components/Modal/StudentLogs/AddStudentModal/AddStudentModal'
import { CreateGroupModal } from 'components/Modal/StudentLogs/CreateGroupModal/CreateGroupModal'
import { StatisticHeader } from 'components/StatisticHeader/StatisticHeader'
import { StudentInfoGraphic } from 'Pages/School/Navigations/StudentsStats/StudentInfoGraphic'
import { StudentLogs } from 'enum/pathE'
import { SettingsGroupModal } from 'components/Modal/StudentLogs/SettingsGroupModal/SettingsGroupModal'

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
              <svg width="212" height="28" viewBox="0 0 212 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.5 14H15.5L21.5 7.5L30.5 14L50 15L64.5 6L72 15H114L120 1.5L129 9L134.5 10L141 14L148 1.5L155 6L165 3.5L169 0L171.5 3.5H176L182.5 12H190.5L197 15H204.5L212 7.5V28H0L1.5 14Z"
                  fill="url(#paint0_linear_283_4115)"
                />
                <defs>
                  <linearGradient id="paint0_linear_283_4115" x1="106" y1="7" x2="106" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B6B6B6" />
                    <stop offset="1" stopColor="#B6B6B6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
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
