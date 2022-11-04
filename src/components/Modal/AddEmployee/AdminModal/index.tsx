import React, { ChangeEvent, FC, useState, useEffect } from 'react'

import { checkCoursesDataT } from 'types/CoursesT'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { radioData } from '../config/radioConfig'
import { Radio } from '../../../common/Radio/Radio'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { Button } from '../../../common/Button'
import { AddEmployeeModalPropsT, AddEmpoyeeModalExtensions } from '../../ModalTypes'
import { useFetchCoursesQuery } from 'api/coursesServices'
import { CoursesDataT } from '../../../../types/CoursesT'

import styles from '../../Modal.module.scss'

export const AdminModal: FC<AddEmployeeModalPropsT & AddEmpoyeeModalExtensions> = ({
  handleCreatEmployee,
  setEmailUser,
  setAddRole,
  addRole,
  emailUser,
  setShowModal,
}) => {
  const { data: courses, isSuccess } = useFetchCoursesQuery()

  const [checkCourses, setCheckCourses] = useState<checkCoursesDataT[]>()

  console.log(checkCourses)

  // const [checked, setChecked] = useState<boolean>(false)

  // const handleChecked = () => {
  //   setChecked(!checked)
  // }

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
      <div className={styles.main_employee_container}>
        <div className={styles.main_employee_closedModal} onClick={setShowModal}>
          <IconSvg width={26} height={26} path={crossIconPath} />
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
        {radioData.map(({ id, title, text, name }) => (
          <div key={title} className={styles.main_employee_role}>
            <div className={styles.main_employee_role_radio}>
              <Radio func={setAddRole} title={title} id={id} name={name} />
            </div>
            <div className={styles.main_employee_role_desc}>{text}</div>
          </div>
        ))}
        <div className={styles.main_employee_course}>
          <span className={styles.main_employee_course_title}>Доступ к курсам</span>
          {courses?.results?.map(({ course_id, name }: CoursesDataT) => (
            <Checkbox key={course_id} id={course_id.toString()} name={name} checked={false}>
              <span>{name}</span>
            </Checkbox>
          ))}
        </div>
        <div className={styles.main_employee_btn}>
          <Button style={{ width: '220px' }} type="submit" disabled={!addRole} text={'Добавить'} variant={addRole ? 'primary' : 'disabled'} />
        </div>
      </div>
    </form>
  )
}
