import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useAppSelector } from 'store/hooks'
import { schoolNameSelector, selectUser } from 'selectors'
import { RoleE } from 'enum/roleE'

import { AddEmployeeModalPropsT } from '../ModalTypes'

import { useAdminRegistrationMutation } from '../../../api/userRegisterService'
import { useAddUserAccessMutation } from '../../../api/userAccessService'
import styles from '../Modal.module.scss'
import { SimpleLoader } from '../../Loaders/SimpleLoader'
import { IconSvg } from '../../common/IconSvg/IconSvg'
import { burgerdHwPath, crossIconPath } from '../../../config/commonSvgIconsPath'
import { checkCourseT } from '../../../types/CoursesT'
import { GroupsDropDown } from 'components/SelectDropDown/GroupsDropDown'
import { Button } from '../../common/Button/Button'
import { useFetchCoursesGroupsQuery } from '../../../api/coursesServices'
import { Radio } from '../../common/Radio/Radio'
import { useBoolean } from '../../../customHooks'
import { Portal } from '../Portal'
import { LimitModal } from '../LimitModal/LimitModal'

export const AddEmployeeModal: FC<AddEmployeeModalPropsT> = ({ employees, setEmployees, setShowModal }) => {
  const schoolName = window.location.href.split('/')[4]
  const [emailUser, setEmailUser] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [registrationAdmin, { isSuccess: isRegistered }] = useAdminRegistrationMutation()
  const [addAccess, { isSuccess: isAccessed }] = useAddUserAccessMutation()

  const { data: courses, isSuccess: isGetted, isFetching } = useFetchCoursesGroupsQuery(schoolName)

  const [checkCourses, setCheckCourses] = useState<checkCourseT[]>()

  const [isOpenLimitModal, { onToggle }] = useBoolean()
  const [message, setMessage] = useState<string>('')

  const handleCheck = (course_id: number, group_id: number | null) => {
    setCheckCourses(prevCourses =>
      prevCourses?.map(course =>
        course.course_id === course_id
          ? {
              ...course,
              selected_group: group_id,
            }
          : course,
      ),
    )
  }

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailUser(event.target.value)
  }

  const handleChangeRole = (role: string) => {
    setRole(role)
  }

    useEffect(() => {
        if (isGetted) {
            const updatedCourses: checkCourseT[] = courses.map(course => ({
                ...course,
                student_groups: course.student_groups.filter(group => group.type === "WITH_TEACHER"),
                selected_group: null,
            }))
            setCheckCourses(updatedCourses)
        }
    }, [courses])

  const handleCreateEmployee = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newUser = {
      email: emailUser,
      // password: 'Alpha1234',
      // password_confirmation: 'Alpha1234',
    }
    await registrationAdmin(newUser)
      .unwrap()
      .then(async (data: any) => {
        const formData = new FormData()
        formData.append('emails', emailUser)
        formData.append('role', role)
        role === 'Teacher' &&
          checkCourses &&
          checkCourses.length &&
          checkCourses.map((course: checkCourseT) => {
            if (course.selected_group) {
              formData.append('student_groups', String(course.selected_group))
            }
          })
        await addAccess({ data: formData, schoolName })
          .unwrap()
          .then(async (accessdata: any) => {
            console.log('uspeh')
          })
          .catch(error => {
            setMessage(error.data)
            onToggle()
          })
      })
  }

  useEffect(() => {
    if (isAccessed) {
      setEmployees([...employees, { email: emailUser, role: role }])
      setShowModal()
    }
  }, [isAccessed])

  return (
    <>
      <form onSubmit={handleCreateEmployee} className={styles.main_employee}>
        {isFetching && (
          <div className={styles.loader}>
            <SimpleLoader style={{ width: '50px', height: '50px' }} />
          </div>
        )}
        <div className={styles.main_employee_container}>
          <div className={styles.main_employee_closedModal} onClick={setShowModal}>
            <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 className={styles.main_employee_title}>Добавление сотрудника</h3>
            <span className={styles.main_employee_subs}>
              Если пользователь еще не зарегистрирован в системе, <br />
              отправим пароль на Email. <br /> Получив его, сотрудник сможет настроить свой профиль
            </span>
          </div>
          <div className={styles.main_employee_invite}>
            <label htmlFor="email">Email нового сотрудника:</label>
            <br />
            <div className={styles.main_employee_invite_input}>
              <input value={emailUser} onChange={handleChangeEmail} type="text" placeholder={'example@mailbox.ru'} />
            </div>
            <br />
            <label htmlFor="role">Роль нового сотрудника:</label>
            <br />
            <div style={{ marginTop: 10 }}>
              <Radio title="Администратор" id="Admin" name="role" func={handleChangeRole} />
              <Radio title="Ментор" id="Teacher" name="role" func={handleChangeRole} />
            </div>
          </div>
          {role === 'Teacher' && (
            <div className={styles.main_employee_course}>
              <span className={styles.main_employee_course_title}>Выбор студенческих групп курсов</span>
              {checkCourses?.map(({ course_id, name, student_groups, selected_group }: checkCourseT) => (
                <>
                  <span style={{ marginTop: 15, marginBottom: 10 }}>{name}</span>
                  <GroupsDropDown dropdownData={student_groups} course_id={course_id} selected_group={selected_group} onChangeGroup={handleCheck} />
                </>
              ))}
            </div>
          )}
          <div className={styles.main_employee_btn}>
            <Button
              style={{ width: '220px' }}
              type="submit"
              disabled={!emailUser || !role}
              text={'Добавить'}
              variant={emailUser && role ? 'primary' : 'disabled'}
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
