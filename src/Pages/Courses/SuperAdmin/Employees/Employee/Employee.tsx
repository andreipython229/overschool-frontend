import React, {FC, memo} from 'react';
import styles from "./employee.module.scss";


type EmployeePropsT = {
    avatar: string
    name: string
    contact: string
    role: string
}

export const Employee: FC<EmployeePropsT> = memo(({avatar, contact, role, name}) => {
    return (
        <div className={styles.employee_user}>
            <div className={styles.employee_user_info}>
                <img className={styles.employee_user_info_avatar} src={avatar} alt="User Avatar"/>
                <div className={styles.employee_user_info_name}>
                    <span>{name}</span>
                    <span>{contact}</span>
                </div>
            </div>
            <div className={styles.employee_user_roleBtn}>
                <div className={styles.employee_user_roleBtn_role}>{role}</div>
                <div>
                    <button className={styles.employee_user_roleBtn_btn}>Изменить</button>
                </div>
            </div>

        </div>
    );
})

