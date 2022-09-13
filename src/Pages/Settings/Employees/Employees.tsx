import { FC } from 'react'

import { Employee } from './Employee/Employee'

import { avatar } from '../../../assets/img/common/index'

import styles from '../superAdmin.module.scss'

type EmployeesPropsT = {
  setModal: () => void
}

export const Employees: FC<EmployeesPropsT> = ({ setModal }) => {
  return (
    <div className={styles.wrapper_actions}>
      <div className={styles.employees}>
        <div className={styles.employees_header}>
          <div className={styles.employees_header_title}>Сотрудники</div>
          <button onClick={setModal} className={styles.employees_header_btn}>
            + Сотрудник
          </button>
        </div>

        <div className={styles.employees_table}>
          <div className={styles.employees_table_title}>
            <div>Пользователь</div>
            <div>Роль</div>
          </div>
          <Employee avatar={avatar} name={'Имя пользователя'} contact={'pochta@gmail.com'} role={'Администратор'} />
          <Employee avatar={avatar} name={'Андрей'} contact={'pochta@gmail.com'} role={'Студент'} />
        </div>
      </div>
    </div>
  )
}
