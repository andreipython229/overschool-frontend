import { ChangeEvent, FC, useState } from 'react'

import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { addStudentIconPath } from '../config/svgIconsPath'
import { AddStudentModalPropsT } from '../../ModalTypes'
import { useFetchStudentsGroupByCourseQuery } from '../../../../api/studentsGroupService'
import { AddNewStudents } from './AddNewStudents'
import { useInviteMutation } from 'api/userRegisterService'
import { studentsGroupsT } from 'types/studentsGroup'
import { CoursesDataT } from 'types/CoursesT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'

type studentT = {
  id: number
  email: string
}

export const AddStudentModal: FC<AddStudentModalPropsT> = ({ setShowModal, courses }) => {
  const [changeCourse, setChangeCourse] = useState<CoursesDataT>(courses[0])
  const [changeGroup, setChangeGroup] = useState<studentsGroupsT>({} as studentsGroupsT)

  const { data: groups } = useFetchStudentsGroupByCourseQuery(changeCourse['course_id'] || courses[0]['course_id'])

  const [inviteStudent, { isLoading, isSuccess, isError }] = useInviteMutation()

  const [students, setStudents] = useState<studentT[]>([
    {
      id: Math.random(),
      email: '',
    },
  ])

  const handleInputEmail = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const checkedStudent = students.map(student => {
      if (student.id === id) {
        return {
          ...student,
          email: event.target.value,
        }
      }
      return student
    })
    setStudents(checkedStudent)
  }

  const handleAddNewStudent = () => {
    const newStudent = {
      id: Math.random(),
      email: '',
    }
    setStudents([...students, newStudent])
  }

  const handleRemoveStudent = (id: number) => () => {
    const newStudentsList = students.filter(student => student.id !== id)
    setStudents(newStudentsList)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const handleInviteStudent = () => {
    const studentsToInvite = students.map(student => {
      return { sender_type: 'email', recipient: student.email, user_type: 1, course_id: changeCourse.course_id }
    })

    inviteStudent(studentsToInvite)
    isSuccess && handleClose()
  }

  return (
    <form noValidate className={styles.container}>
      <div onClick={handleClose} className={styles.container_closed}>
        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
      </div>
      <div className={styles.addStudent}>
        <div className={styles.container_header}>
          <IconSvg width={50} height={50} viewBoxSize="0 0 50 50" path={addStudentIconPath} />
          <span className={styles.container_header_title}>Добавление учеников</span>
        </div>
        <div className={styles.addStudent_select}>
          {courses && <SelectInput optionsList={courses} optionName={'name' as keyof object} setSelectedValue={setChangeCourse} />}
          {groups && <SelectInput optionsList={groups?.results} optionName={'name' as keyof object} setSelectedValue={setChangeGroup} />}
        </div>
        {students.map((student, index: number) => (
          <AddNewStudents
            key={student.id}
            id={student.id}
            index={index}
            handleRemoveStudent={handleRemoveStudent}
            studentEmail={student.email}
            onChangeEmail={handleInputEmail}
          />
        ))}
        <div className={styles.addStudent_btnBlock}>
          <Button type={'button'} onClick={handleAddNewStudent} style={{ width: '474px' }} variant={'secondary'} text={'Добавить ещё одного'} />
          <Button
            type={'button'}
            style={{ width: '474px' }}
            variant={isLoading || !students[0].email || isError ? 'disabled' : 'primary'}
            text={isLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Отправить приглашение'}
            onClick={handleInviteStudent}
            disabled={isLoading || !students[0].email || isError}
          />
        </div>
      </div>
    </form>
  )
}
