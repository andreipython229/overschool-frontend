import React, { FC, FormEvent, memo, useEffect, useState } from 'react'

import { EmployeePropsT } from '../../../../types/pageTypes'
import { useBoolean } from 'customHooks'
import { ReviewTeacherGroups } from 'components/Modal/index'
import { Portal } from 'components/Modal/Portal'
import { useRemoveUserAccessMutation } from 'api/userAccessService'
import { userRoleName } from 'config/index'
import styles from './employee.module.scss'
import { LimitModal } from '../../../../components/Modal/LimitModal/LimitModal'
import { EmployeeT } from '../../../../types/userT'
import { getUserIdFromLocalStorage } from 'utils/getUserId';
import { RenameEmployee } from 'components/Modal/RenameEmployee/RenameEmployee'

export const Employee: FC<EmployeePropsT> = memo(({ avatar, contact, role, name, id, employees, setEmployees, isModalRenameOpen }) => {
  const userId = getUserIdFromLocalStorage();
  const school_id = localStorage.getItem('school_id')
  const [removeAccess, { isSuccess: isRemoved }] = useRemoveUserAccessMutation()
  const schoolName = window.location.href.split('/')[4]
  const [isOpenLimitModal, { onToggle }] = useBoolean()
  const [message, setMessage] = useState<string>('')
  const [isModalOpen, { on, off }] = useBoolean()
  const [isRenameModalOpen, { onToggle: toggleRenameModal }] = useBoolean()

  const handleDeleteEmployee = async () => {
    const formData = new FormData()
    formData.append('emails', contact)
    formData.append('role', role)
    formData.append('pseudonym', name)
    await removeAccess({ data: formData, schoolName })
      .unwrap()
      .then(async (accessdata: any) => {
        console.log('uspeh')
      })
      .catch(error => {
        setMessage(error.data)
        onToggle()
      })
  }

  const handleChangePseudonym = () => {
    toggleRenameModal();
  }

  useEffect(() => {
    if (isRemoved) {
      setEmployees(employees.filter(employee => employee.id !== id))
    }
  }, [isRemoved])

  useEffect(() => {
    isModalRenameOpen();
  }, [isRenameModalOpen])


  return (
    <div className={styles.wrapper}>
      <div className={styles.employee_user}>
        <div className={styles.employee_user_info}>
          <img className={styles.employee_user_info_avatar} src={avatar} alt="User Avatar" />
          <div className={styles.employee_user_info_name}>
            <span>
            {userId !== id ? (
              <>
                {name} |
                <button className={styles.changePseudonymBtn} onClick={handleChangePseudonym}>Переименовать</button>
              </>
            ) : (
              <>
                {name}
              </>
            )}
            </span>
            <span>{contact}</span>
          </div>
        </div>
        <div className={styles.employee_user_roleBtn}>
          <div className={styles.employee_user_roleBtn_role}>{userRoleName[role]}</div>
          <div>
            {role === 'Teacher' && (
              <button className={styles.employee_user_roleBtn_btn} onClick={off}>
                Уч. группы
              </button>
            )}
            <button className={styles.employee_user_roleBtn_btn} onClick={handleDeleteEmployee}>
              Удалить
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Portal closeModal={on}>
          <ReviewTeacherGroups closeModal={on} name={name} email={contact} id={id} />
        </Portal>
      )}
      {isRenameModalOpen && id && school_id && (
        <Portal closeModal={toggleRenameModal}>
          <RenameEmployee onClose={toggleRenameModal} userId={id} school_id={school_id} schoolName={schoolName} />
        </Portal>
      )}
      {isOpenLimitModal ? (
        <Portal closeModal={onToggle}>
          <LimitModal message={message} setShowLimitModal={onToggle} />
        </Portal>
      ) : null}
    </div>
  )
})
