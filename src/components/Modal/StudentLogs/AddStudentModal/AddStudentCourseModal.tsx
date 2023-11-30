import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { addStudentIconPath } from '../config/svgIconsPath'
import { AddStudentModalPropsT } from '../../ModalTypes'
import { useFetchStudentsGroupByCourseQuery } from '../../../../api/studentsGroupService'
import { AddNewStudents } from './AddNewStudents'
import { studentsGroupT, studentsGroupsT } from 'types/studentsGroup'
import { checkCourseT, CoursesDataT } from 'types/CoursesT'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'
import { useParams } from 'react-router-dom'
import { useAdminRegistrationMutation } from 'api/userRegisterService'
import { useAddUserAccessMutation } from 'api/userAccessService'
import { Portal } from '../../Portal'
import { LimitModal } from '../../LimitModal/LimitModal'
import { useBoolean } from '../../../../customHooks'
import { validateEmail } from 'utils/validateEmail'
import { eventNames } from 'process'

type studentT = {
  id: number
  email: string
}

export const AddStudentModal: FC<AddStudentModalPropsT> = ({ setShowModal, courses }) => {
  const params = useParams()
  const { data: groups, isFetching, isSuccess } = useFetchStudentsGroupByCourseQuery(Number(params.course_id))
  const [registrationAdmin] = useAdminRegistrationMutation()
  const [addStudents, { isSuccess: studentSuccess, isLoading: studentLoading, isError: studentError }] = useAddUserAccessMutation()
  const [groupsList, setGroupsList] = useState<studentsGroupT>()
  const [selectedGroup, setSelectedGroup] = useState<string>()
  const [students, setStudents] = useState<studentT[]>([
    {
      id: Math.random(),
      email: '',
    },
  ])
  const [isOpenLimitModal, { onToggle }] = useBoolean()
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (isSuccess && groups) {
      setGroupsList(groups)
    }
  }, [isSuccess])

  const handleInputEmail = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setError('')
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
    setShowModal()
  }

  const handleSendPermissions = async () => {
    const formdata = new FormData()
    formdata.append('role', 'Student')
    if (groupsList && selectedGroup) {
      formdata.append('student_groups', selectedGroup)
    } else if (params.group_id) {
      formdata.append('student_groups', params.group_id)
    }
    let count = 0
    students.map(async student => {
      await registrationAdmin({ email: student.email })
        .unwrap()
        .then(async (data: any) => {
          count = count + 1
          formdata.append('emails', student.email)
          if (count === students.length) {
            await addStudents(formdata)
              .unwrap()
              .then(async (accessdata: any) => {
                setShowModal()
              })
              .catch(error => {
                setMessage(error.data)
                onToggle()
              })
          }
        })
    })
  }

  const handleSubmitForm = () => {
    if (groupsList) {
      const validatedStudents: { id: number; email: string }[] = []
      students.forEach(student => {
        if (student.email && validateEmail(student.email)) {
          validatedStudents.push({ id: student.id, email: student.email })
        } else if (!student.email || student.email.length === 0) {
          setError('Поле email должно быть заполнено')
        } else {
          setError('Проверьте правильность введенной электронной почты')
        }
      })
      if (validatedStudents && selectedGroup && validatedStudents.length === students.length) {
        handleSendPermissions()
      } else if (!selectedGroup) {
        setError('Выберите группу')
      }
    } else {
      const validatedStudents: { id: number; email: string }[] = []
      students.forEach(student => {
        if (student.email && validateEmail(student.email)) {
          validatedStudents.push({ id: student.id, email: student.email })
        } else if (!student.email || student.email.length === 0) {
          setError('Поле email должно быть заполнено')
        } else {
          setError('Проверьте правильность введенной электронной почты')
        }
      })
      if (validatedStudents && validatedStudents.length === students.length) {
        handleSendPermissions()
      }
    }
  }

  if (isFetching) {
    return <SimpleLoader />
  }

  return (
    <>
      <form className={styles.container}>
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
          {groupsList && (
            <div className={styles.container_header_title_btn}>
              <SelectInput
                optionsList={groupsList?.results.map(({ name, group_id }) => ({
                  label: name,
                  value: String(group_id),
                }))}
                defaultOption="Выберите группу"
                selectedOption={selectedGroup}
                setSelectedValue={setSelectedGroup}
              />
            </div>
          )}
          {error && <p style={{ textAlign: 'center', color: 'red', opacity: '0.9', padding: '0.5em' }}>{error}</p>}

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
            <Button type={'button'} onClick={handleAddNewStudent} className={styles.container_header_title_btn_add} variant={'secondary'} text={'Добавить ещё одного'} />
            <Button className={styles.container_header_title_btn_send}
              type={'button'}
              onClick={handleSubmitForm}
              variant={studentLoading || !students[0].email || studentError ? 'disabled' : 'primary'}
              text={studentLoading ? <SimpleLoader style={{ width: '25px', height: '25px' }} loaderColor="#ffff" /> : 'Отправить приглашение'}
              disabled={studentLoading || !students[0].email || studentError}
            />
          </div>
        </div>
      </form>
      {isOpenLimitModal ? (
        <Portal closeModal={onToggle}>
          <LimitModal message={message} setShowLimitModal={onToggle} setShowMainModal={setShowModal} />
        </Portal>
      ) : null}
    </>
  )
}
