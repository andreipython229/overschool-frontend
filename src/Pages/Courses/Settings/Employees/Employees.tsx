import React, {FC} from 'react';
import styles from '../superAdmin.module.scss'
import {Employee} from "./Employee/Employee";
import Avatar from '../../../../assets/img/avatar.svg'

type EmployeesPropsT = {
    setModal: () => void
}

export const Employees: FC<EmployeesPropsT> = ({setModal}) => {
    return (
        <div className={styles.wrapper_actions}>
            <div className={styles.employees}>
                <div className={styles.employees_header}>
                    <div className={styles.employees_header_title}>Сотрудники</div>
                    <button onClick={setModal} className={styles.employees_header_btn}>+ Сотрудник</button>
                </div>

                <div className={styles.employees_table}>
                    <div className={styles.employees_table_title}>
                        <div>Пользователь</div>
                        <div>Роль</div>
                    </div>
                    <Employee avatar={Avatar} name={'Имя пользователя'} contact={'pochta@gmail.com'}
                              role={'Администратор'}/>
                    <Employee avatar={Avatar} name={'Андрей'} contact={'pochta@gmail.com'} role={'Студент'}/>
                </div>
            </div>
        </div>
    );
};

