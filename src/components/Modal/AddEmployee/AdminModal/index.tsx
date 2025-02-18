import React, { ChangeEvent, FC, useState, useEffect } from 'react'

import { checkCoursesDataT } from 'types/CoursesT'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
// import { radioData } from '../config/radioConfig'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { Button } from '../../../common/Button/Button'
import { AddEmployeeModalPropsT, AddEmpoyeeModalExtensions } from '../../ModalTypes'
import { useFetchCoursesQuery } from 'api/coursesServices'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

//import { CoursesDataT } from 'types/CoursesT'

import styles from '../../Modal.module.scss'

export const AdminModal: FC<AddEmployeeModalPropsT & AddEmpoyeeModalExtensions> = ({
  handleCreatEmployee,
  setEmailUser,
  emailUser,
  setShowModal,
}) => {
  const schoolName = window.location.href.split('/')[4]
  const { data: courses, isSuccess, isFetching } = useFetchCoursesQuery(schoolName)

  const [checkCourses, setCheckCourses] = useState<checkCoursesDataT[]>()

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckCourses(prevCourses =>
      prevCourses?.map(course => (course.course_id === +e.target.id ? { ...course, checked: e.target.checked } : course)),
    )
  }

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailUser(event.target.value)
  }

  useEffect(() => {
    if (isSuccess) {
      const updatedCourses: checkCoursesDataT[] = courses.results.map(course => ({ ...course, checked: false }))
      setCheckCourses(updatedCourses)
    }
  }, [courses])

  return (
    <form onSubmit={handleCreatEmployee} className={styles.main_employee}>
      {isFetching && (
        <div className={styles.loader}>
          <SimpleLoader style={{ width: '50px', height: '50px' }} />
        </div>
      )}
      <div className={styles.main_employee_container}>
        <div className={styles.main_employee_closedModal} onClick={setShowModal}>
          <IconSvg width={30} height={30} viewBoxSize="0 0 64 64" path={crossIconPath} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 className={styles.main_employee_title}>Добавление сотрудника</h3>
          <span className={styles.main_employee_subs}>
            Отправим приглашение на Email. <br /> Приняв его, сотрудник сможет настроить свой профиль
          </span>
        </div>
        <div className={styles.main_employee_invite}>
          <label htmlFor="email">Email нового сотрудника:</label>
          <br />
          <div className={styles.main_employee_invite_input}>
            <input value={emailUser} onChange={handleChangeEmail} type="text" placeholder={'example@mailbox.ru'} />
          </div>
        </div>

        <div className={styles.main_employee_course}>
          <span className={styles.main_employee_course_title}>Доступ к курсам</span>
          {checkCourses?.map(({ course_id, name, checked }: checkCoursesDataT) => (
            <Checkbox key={course_id} id={course_id.toString()} name={name} checked={checked} onChange={handleChecked}>
              <span>{name}</span>
            </Checkbox>
          ))}
        </div>
        <div className={styles.main_employee_btn}>
          <Button style={{ width: '220px' }} type="submit" disabled={!emailUser} text={'Добавить'} variant={emailUser ? 'primary' : 'disabled'} />
        </div>
      </div>
    </form>
  )
}
