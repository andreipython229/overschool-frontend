import { ChangeEvent, FC, useState } from 'react'

import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { addStudentIconPath } from '../config/svgIconsPath'
import { AddStudentModalPropsT } from '../../ModalTypes'
import { useFetchStudentsGroupByCourseQuery } from '../../../../api/studentsGroupService'
import { AddNewStudents } from './AddNewStudents'

import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'

type studentT = {
  id: number
  email: string
}

export const AddStudentModal: FC<AddStudentModalPropsT> = ({ setShowModal, setChangeCourse, setChangeGroup, courses, changeCourse }) => {
  const { data: groups } = useFetchStudentsGroupByCourseQuery(changeCourse['course_id'] || courses[0]['course_id'])

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
          <Button style={{ width: '474px' }} variant={'primary'} text={'Отправить приглашение'} />
        </div>
      </div>
    </form>
  )
}
