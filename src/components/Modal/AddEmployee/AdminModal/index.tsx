import React, { ChangeEvent, FC, useState } from 'react'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { crossIconPath } from '../../../../config/commonSvgIconsPath'
import { radioData } from '../config/radioConfig'
import { Radio } from '../../../common/Radio/Radio'
import { checkBoxData } from '../config/checkBoxConfig'
import { Checkbox } from '../../../common/Checkbox/Checkbox'
import { Button } from '../../../common/Button/Button'
import { AddEmployeeModalPropsT, AddEmpoyeeModalExtensions } from '../../ModalTypes'

import styles from '../../Modal.module.scss'

export const AdminModal: FC<AddEmployeeModalPropsT & AddEmpoyeeModalExtensions> = ({
  handleCreatEmployee,
  setEmailUser,
  setAddRole,
  addRole,
  emailUser,
  setShowModal,
}) => {
  const [checkedItem, setCheckedItem] = useState<{ [key: string]: boolean }>({
    python: false,
    java: false,
    frontend: false,
    ui: false,
    english: false,
    englishStart: false,
  })

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailUser(event.target.value)
  }

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    setCheckedItem({ ...checkedItem, [target.name]: target.checked })
  }
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
          {checkBoxData.map(({ id, name, span }) => (
            <div key={id} className={styles.main_employee_course_checkbox}>
              <Checkbox id={id} name={name} checked={checkedItem[name]} onChange={handleChecked} />
              <span>{span}</span>
            </div>
          ))}
        </div>
        <div className={styles.main_employee_btn}>
          <Button style={{ width: '220px' }} type="submit" disabled={!addRole} text={'Добавить'} variant={addRole ? 'primary' : 'disabled'} />
        </div>
      </div>
    </form>
  )
}
