import { ChangeEvent, FC, useEffect, useState } from 'react'

import { SelectInput } from 'components/common/SelectInput/SelectInput'
import { Button } from 'components/common/Button/Button'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { addStudentIconPath } from '../config/svgIconsPath'
import { AddStudentModalPropsT } from '../../ModalTypes'
import { useLazyFetchStudentGroupQuery, useLazyFetchStudentsGroupByCourseQuery } from '../../../../api/studentsGroupService'
import { useLazyFetchCoursesGroupsQuery } from '../../../../api/coursesServices'
import { CourseWithGroupsT } from 'types/CoursesT'
import { AddNewStudents } from './AddNewStudents'
import { studentsGroupT, studentsGroupsT } from 'types/studentsGroup'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'
import styles from 'components/Modal/StudentLogs/studentsLog.module.scss'
import { useParams } from 'react-router-dom'
import { useAdminRegistrationMutation } from 'api/userRegisterService'
import { useAddUserAccessMutation } from 'api/userAccessService'
import { Portal } from '../../Portal'
import { LimitModal } from '../../LimitModal/LimitModal'
import { useBoolean } from '../../../../customHooks'
import { validateEmail } from 'utils/validateEmail'
import { LoaderLayout } from 'components/Loaders/LoaderLayout'

type studentT = {
  id: number
  email: string
  first_name: string
  last_name: string
  patronymic: string
}

type requestData = {
  [key: string]: any
}

export const AddStudentModal: FC<AddStudentModalPropsT> = ({ setShowModal, courses, headerText }) => {
  const params = useParams()
  const { group_id: groupId } = params
  const schoolName = window.location.href.split('/')[4]
  const [fetchGroups, { data: groups, isFetching, isSuccess }] = useLazyFetchStudentsGroupByCourseQuery()
  const [fetchGroup, { data: group, isFetching: groupFetching, isSuccess: groupSuccess }] = useLazyFetchStudentGroupQuery()
  const [fetchCourses, { data: fetchedCourses, isFetching: coursesFetching, isSuccess: coursesSuccess }] = useLazyFetchCoursesGroupsQuery()
  const [registrationAdmin] = useAdminRegistrationMutation()
  const [addStudents, { isSuccess: studentSuccess, isLoading: studentLoading, isError: studentError }] = useAddUserAccessMutation()
  const [groupsList, setGroupsList] = useState<studentsGroupT>()
  const [selectedGroup, setSelectedGroup] = useState<string>()
  const [students, setStudents] = useState<studentT[]>([
    {
      id: Math.random(),
      first_name: '',
      patronymic: '',
      last_name: '',
      email: '',
    },
  ])
  const [currentGroup, setCurrentGroup] = useState<studentsGroupsT>()
  const [isOpenLimitModal, { onToggle }] = useBoolean()
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const isSchoolLevel = headerText === 'Все ученики платформы'
  const [coursesWithGroups, setCoursesWithGroups] = useState<CourseWithGroupsT[]>([])
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])
  const [selectedGroups, setSelectedGroups] = useState<{ [courseId: number]: string }>({})
  const handleCourseToggle = (courseId: number) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }
  const handleGroupChange = (courseId: number, groupId: string) => {
    setSelectedGroups(prev => ({ ...prev, [courseId]: groupId }))
  }

  useEffect(() => {
    if (isSchoolLevel) {
      fetchCourses(schoolName)
    } else if (groupId) {
      fetchGroup({ id: groupId, schoolName })
        .unwrap()
        .then(data => setCurrentGroup(data))
    } else {
      fetchGroups({ id: Number(params.course_id), schoolName })
    }
  }, [params])

  useEffect(() => {
    if (selectedGroup && groupsList) {
      const group = groupsList.results.filter(obj => obj.group_id === Number(selectedGroup))[0]
      setCurrentGroup(group)
    }
  }, [selectedGroup])

  useEffect(() => {
    if (isSuccess && groups) {
      setGroupsList(groups)
    }
  }, [isSuccess])

  useEffect(() => {
    if (coursesSuccess && fetchedCourses) {
      setCoursesWithGroups(fetchedCourses)
    }
  }, [coursesSuccess])

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

  const handleInputName = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setError('')
    const checkedStudent = students.map(student => {
      if (student.id === id) {
        return {
          ...student,
          first_name: event.target.value,
        }
      }
      return student
    })
    setStudents(checkedStudent)
  }

  const handleInputLastName = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setError('')
    const checkedStudent = students.map(student => {
      if (student.id === id) {
        return {
          ...student,
          last_name: event.target.value,
        }
      }
      return student
    })
    setStudents(checkedStudent)
  }

  const handleInputPatronymic = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setError('')
    const checkedStudent = students.map(student => {
      if (student.id === id) {
        return {
          ...student,
          patronymic: event.target.value,
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
      first_name: '',
      patronymic: '',
      last_name: '',
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
    const formData = new FormData()
    formData.append('role', 'Student')
    if (isSchoolLevel) {
      const groupIds = Object.values(selectedGroups)
      if (groupIds.length === 0) {
        setError('Выберите хотя бы одну группу')
        return
      }
      formData.append('student_groups', groupIds.join(','))
    } else {
      if (groupsList && selectedGroup) {
        formData.append('student_groups', selectedGroup)
      } else if (params.group_id) {
        formData.append('student_groups', params.group_id)
      }
    }
    const emails: string[] = []
    try {
      for (const student of students) {
        await registrationAdmin({
          email: student.email.toLowerCase(),
          first_name: student.first_name,
          last_name: student.last_name,
          patronymic: student.patronymic,
        }).unwrap()
        emails.push(student.email.toLowerCase())
      }
      emails.forEach(email => formData.append('emails', email))
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value, typeof(value))
      }
      await addStudents({ data: formData, schoolName }).unwrap();
      setShowModal();
    } catch (error: any) {
      const htmlError = typeof error?.data === 'string' && error.data.includes('TemplateDoesNotExist');
      if (htmlError) {
        console.warn('Шаблон письма не найден, но студент успешно добавлен.');
      } else {
        setMessage('При добавлении новых учеников в группу, произошла ошибка. Попробуйте позже...');
        onToggle();
      }
    }
  }


  const handleSubmitForm = () => {
    if (groupsList) {
      const validatedStudents: { id: number; email: string }[] = []
      students.forEach(student => {
        if (student.email && validateEmail(student.email)) {
          validatedStudents.push({ id: student.id, email: student.email.toLowerCase() })
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
          validatedStudents.push({ id: student.id, email: student.email.toLowerCase() })
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
    return <LoaderLayout />
  }

  return (
    <>
      <form className={styles.container}>
        <div onClick={handleClose} className={styles.container_closed}>
          <IconSvg width={50} height={50} viewBoxSize="0 0 58 58" path={crossIconPath} />
        </div>
        <div className={styles.addStudent}>
          <div className={styles.container_header}>
            <IconSvg width={100} height={100} viewBoxSize="0 0 101 100" path={addStudentIconPath} />
            <span className={styles.container_header_title}>Добавление учеников</span>
          </div>
          {isSchoolLevel && (
            <div className={styles.container_header_title_btn}>
              {coursesWithGroups.map(course => (
                <div key={course.course_id}>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '1rem'}}>
                    <input
                      type="checkbox"
                      value={course.course_id}
                      checked={selectedCourses.includes(course.course_id)}
                      onChange={() => handleCourseToggle(course.course_id)}
                    />
                    {course.name}
                  </label>
                  {selectedCourses.includes(course.course_id) && course.student_groups?.length > 0 && (
                    <div style={{ marginTop: '5px' }}>
                      <SelectInput
                        optionsList={course.student_groups.map(group => ({
                          label: group.name,
                          value: String(group.group_id),
                        }))}
                        defaultOption="Выберите группу"
                        selectedOption={selectedGroups[course.course_id]}
                        setSelectedValue={value => handleGroupChange(course.course_id, value)}
                      />
                    </div>
                  )}
                </div>
                )
              )
              }
            </div>
          )}
          {groupsList && (
            <div className={styles.container_header_title_btn}>
              <SelectInput
                optionsList={groupsList?.results.map(({ name, group_id }) => ({
                  label: name,
                  value: String(group_id),
                }))}
                className={styles.selectGroup}
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
              studentName={student.first_name}
              studentLastName={student.last_name}
              studentPatronymic={student.patronymic}
              onChangeEmail={handleInputEmail}
              onChangeName={handleInputName}
              onChangeLastName={handleInputLastName}
              onChangePatronymic={handleInputPatronymic}
            />
          ))}
          <div className={styles.addStudent_btnBlock}>
            <Button
              type={'button'}
              onClick={handleAddNewStudent}
              className={styles.container_header_title_btn_add}
              variant={'newSecondary'}
              text={'Добавить ещё одного'}
            />
            <Button
              className={styles.container_header_title_btn_send}
              type={'button'}
              onClick={handleSubmitForm}
              variant={studentLoading || !students[0].email || studentError ? 'newDisabled' : 'newPrimary'}
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
