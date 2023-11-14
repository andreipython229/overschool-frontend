import React, {FC, FormEvent, memo, useEffect, useState} from 'react'

import {EmployeePropsT} from '../../../../types/pageTypes'
import {useBoolean} from 'customHooks'
import {ReviewTeacherGroups} from 'components/Modal/index'
import {Portal} from 'components/Modal/Portal'
import {useRemoveUserAccessMutation} from 'api/userAccessService'

import styles from './employee.module.scss'
import {checkCourseT} from "../../../../types/CoursesT";
import {LimitModal} from "../../../../components/Modal/LimitModal/LimitModal";
import {EmployeeT} from "../../../../types/userT";

export const Employee: FC<EmployeePropsT> = memo(({avatar, contact, role, name, id, employees, setEmployees}) => {

    const [removeAccess, {isSuccess: isRemoved}] = useRemoveUserAccessMutation()
    const [isOpenLimitModal, {onToggle}] = useBoolean()
    const [message, setMessage] = useState<string>('')
    const [isModalOpen, {on, off}] = useBoolean()

    const handleDeleteEmployee = async () => {
        const formData = new FormData();
        formData.append('emails', contact);
        formData.append('role', role);
        await removeAccess(formData).unwrap().then(async (accessdata: any) => {
                console.log('uspeh')
            }).catch((error) => {
                setMessage(error.data)
                onToggle()
            })
    }

    useEffect(() => {
        if (isRemoved) {
            setEmployees(employees.filter(employee => (employee.id !== id)))
        }
    }, [isRemoved])

    return (
        <div className={styles.wrapper}>
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
                        {role === "Teacher" &&
                        <button className={styles.employee_user_roleBtn_btn} onClick={off}>
                            Уч. группы
                        </button>}
                        <button className={styles.employee_user_roleBtn_btn} onClick={handleDeleteEmployee}>
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <Portal closeModal={on}>
                    <ReviewTeacherGroups closeModal={on} name={name} email={contact} id={id}/>
                </Portal>
            )}
            {isOpenLimitModal ? (
            <Portal closeModal={onToggle}>
                <LimitModal message={message} setShowLimitModal={onToggle}/>
            </Portal>
            ) : null}
        </div>
    )
})
