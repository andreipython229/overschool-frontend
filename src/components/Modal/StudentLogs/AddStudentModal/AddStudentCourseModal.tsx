import { ChangeEvent, FC, useEffect, useState } from 'react'

import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { addStudentIconPath } from '../config/svgIconsPath'
import { AddStudentModalPropsT } from '../../ModalTypes'
import { useFetchStudentsGroupByCourseQuery } from '../../../../api/studentsGroupService'
import { AddNewStudents } from './AddNewStudents'
import { studentsGroupT, studentsGroupsT } from 'types/studentsGroup'
import { CoursesDataT } from 'types/CoursesT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'
import { useParams } from 'react-router-dom'
import { useAddUserAccessMutation } from 'api/userAccessService'

type studentT = {
  id: number
  email: string
  groupId: string
}

export const AddStudentModal: FC<AddStudentModalPropsT> = ({ setShowModal, courses }) => {
  const params = useParams()
  const { data: groups, isFetching, isSuccess } = useFetchStudentsGroupByCourseQuery(Number(params.course_id))
  const [addStudents, { isSuccess: studentSuccess, isLoading: studentLoading, isError: studentError }] = useAddUserAccessMutation()
  const [groupsList, setGroupsList] = useState<studentsGroupT>()
  const [students, setStudents] = useState<studentT[]>([
    {
      id: Math.random(),
      email: '',
      groupId: '',
    },
  ])

  useEffect(() => {
    if (isSuccess && groups) {
      setGroupsList(groups)
    }
  }, [isSuccess])

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

  const handleSelectGroup = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const checkedStudent = students.map(student => {
      if (student.id === id) {
        return {
          ...student,
          groupId: String(event),
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
      groupId: '',
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

  const handleSendPermissions = async () => {
    const formdata = new FormData()
    students.map(student => {
      formdata.append('emails', student.email)
      formdata.append('role', 'Student')
      if (groupsList) {
        formdata.append('student_groups', student.groupId)
      } else if (params.group_id) {
        formdata.append('student_groups', params.group_id)
      } else {
        return console.log('ошибка формирования формдаты')
      }
    })
    await addStudents(formdata)
      .unwrap()
      .then(async data => {
        await setShowModal(false)
        await window.location.reload()
      })
      .catch(err => {
        console.log('ошибка', err)
      })
  }

  if (isFetching) {
    return <SimpleLoader />
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
          {/* {courses && <SelectInput optionsList={courses} optionName={'name' as keyof object} setSelectedValue={setChangeCourse} />}
          {groups && <SelectInput optionsList={groups?.results} optionName={'name' as keyof object} setSelectedValue={setChangeGroup} />} */}
        </div>
        {students.map((student, index: number) => (
          <AddNewStudents
            key={student.id}
            id={student.id}
            index={index}
            groupsList={groupsList}
            handleRemoveStudent={handleRemoveStudent}
            studentEmail={student.email}
            onChangeEmail={handleInputEmail}
            studentGroup={student.groupId}
            onChangeGroup={handleSelectGroup}
          />
        ))}
        <div className={styles.addStudent_btnBlock}>
          <Button type={'button'} onClick={handleAddNewStudent} style={{ width: '474px' }} variant={'secondary'} text={'Добавить ещё одного'} />
          <Button
            type={'button'}
            style={{ width: '474px' }}
            variant={studentLoading || !students[0].email || studentError ? 'disabled' : 'primary'}
            text={studentLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Отправить приглашение'}
            onClick={handleSendPermissions}
            disabled={studentLoading || !students[0].email || studentError}
          />
        </div>
      </div>
    </form>
  )
}
