import { FC } from 'react'

import { Employee } from './Employee/Employee'
import { useBoolean } from 'customHooks/useBoolean'
import { avatar } from '../../../assets/img/common/index'
import { AddEmployeeModal } from 'components/Modal'
import { Portal } from 'components/Modal/Portal/index'

import styles from '../superAdmin.module.scss'

export const Employees: FC = () => {
  const [isModalOpen, { off: openModal, on: closeModal }] = useBoolean()

  return (
    <>
      {isModalOpen && (
        <Portal closeModal={closeModal}>
          <AddEmployeeModal setShowModal={closeModal} />
        </Portal>
      )}
      <div className={styles.wrapper_actions}>
        <div className={styles.employees}>
          <div className={styles.employees_header}>
            <div className={styles.employees_header_title}>Сотрудники</div>
            <button onClick={openModal} className={styles.employees_header_btn}>
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
    </>
  )
}
