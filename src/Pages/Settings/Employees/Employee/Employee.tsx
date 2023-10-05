import {FC, memo, useState} from 'react'

import { EmployeePropsT } from '../../../../types/pageTypes'
import { useBoolean } from 'customHooks'
import { ChangeEmployeeRights } from 'components/Modal/index'
import { Portal } from 'components/Modal/Portal'

import styles from './employee.module.scss'

export const Employee: FC<EmployeePropsT> = memo(({ avatar, contact, role, name }) => {

  const [isModalOpen, { on, off }] = useBoolean()

  return (
    <>
      <div className={styles.employee_user}>
        <div className={styles.employee_user_info}>
          <img className={styles.employee_user_info_avatar} src={avatar} alt="User Avatar" />
          <div className={styles.employee_user_info_name}>
            <span>{name}</span>
            <span>{contact}</span>
          </div>
        </div>
        <div className={styles.employee_user_roleBtn}>
          <div className={styles.employee_user_roleBtn_role}>{role}</div>
          <div>
            <button className={styles.employee_user_roleBtn_btn} onClick={off}>
              Изменить
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Portal closeModal={on}>
          <ChangeEmployeeRights closeModal={on} name={name} email={contact} role={role} />
        </Portal>
      )}
    </>
  )
})
