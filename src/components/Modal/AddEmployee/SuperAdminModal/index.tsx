import React, { ChangeEvent, FC } from 'react'
import { IconSvg } from '../../../common/IconSvg/IconSvg'
import { modalIconPath } from '../config/svgIconsPath'
import { Radio } from '../../../common/Radio/Radio'
import { Button } from '../../../common/Button/Button'
import { AddEmployeeModalPropsT, AddEmpoyeeModalExtensions } from '../../ModalTypes'

import styles from '../../Modal.module.scss'

export const SuperAdminModal: FC<AddEmployeeModalPropsT & AddEmpoyeeModalExtensions> = ({
  handleCreatEmployee,
  setEmailUser,
  setAddRole,
  addRole,
  emailUser,
  setShowModal,
}) => {
  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailUser(event.target.value)
  }

  return (
    <form className={styles.main_employee} onSubmit={handleCreatEmployee}>
      <div className={styles.main_employee_container}>
        <div className={styles.main_employee_closedModal} onClick={setShowModal}>
          <IconSvg width={14} height={14} viewBoxSize={'0 0 14 14'} path={modalIconPath} />
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
            <input onChange={handleChangeEmail} value={emailUser} type="text" placeholder={'example@mailbox.ru'} />
          </div>
        </div>
        <div className={styles.main_employee_role}>
          <div className={styles.main_employee_role_radio}>
            <Radio func={setAddRole} title={'Администратор'} id={'Admin'} />
          </div>
          <div className={styles.main_employee_role_desc}>
            Может создавать и удалять курсы, добавлять сотрудников, производить операции со счетом и тарифами
          </div>
        </div>
        <div className={styles.main_employee_btn}>
          <Button disabled={!addRole} type="submit" text={'Добавить'} variant={addRole ? 'primary' : 'disabled'} />
        </div>
      </div>
    </form>
  )
}
