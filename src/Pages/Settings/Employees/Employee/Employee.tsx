import { FC, memo, useEffect, useState } from 'react'
import { EmployeePropsT } from '../../../../types/pageTypes'
import { useBoolean } from 'customHooks'
import { ReviewTeacherGroups } from 'components/Modal/index'
import { Portal } from 'components/Modal/Portal'
import { useRemoveUserAccessMutation } from 'api/userAccessService'
import { userRoleName } from 'config/index'
import styles from './employee.module.scss'
import { LimitModal } from '../../../../components/Modal/LimitModal/LimitModal'
import { RenameEmployee } from 'components/Modal/RenameEmployee/RenameEmployee'
import { NewUserRole } from 'components/Modal/NewUserRole/NewUserRole'
import { useAppSelector } from 'store/hooks'
import { schoolSelector, selectUser } from 'selectors'

export const Employee: FC<EmployeePropsT> = memo(
  ({ avatar, contact, role, name, id, employees, additional_roles, setEmployees, isModalRenameOpen }) => {
    const { userId } = useAppSelector(selectUser)
    const { schoolId: school_id, schoolName } = useAppSelector(schoolSelector)
    const [removeAccess, { isSuccess: isRemoved }] = useRemoveUserAccessMutation()
    const [isOpenLimitModal, { onToggle }] = useBoolean()
    const [message, setMessage] = useState<string>('')
    const [isModalOpen, { on, off }] = useBoolean()
    const [isRenameModalOpen, { onToggle: toggleRenameModal }] = useBoolean()
    const [isNewRoleModalOpen, { onToggle: toggleNewRoleModal }] = useBoolean()

    const handleDeleteEmployee = async () => {
      const formData = new FormData()
      formData.append('emails', contact)
      formData.append('role', role)
      formData.append('pseudonym', name)
      await removeAccess({ data: formData, schoolName })
        .unwrap()
        .catch(error => {
          setMessage(error.data)
          onToggle()
        })
    }

    const handleAddRole = async () => {
      toggleNewRoleModal()
    }

    const handleChangePseudonym = () => {
      toggleRenameModal()
    }

    useEffect(() => {
      if (isRemoved) {
        setEmployees(employees.filter(employee => employee.id !== id))
      }
    }, [isRemoved])

    useEffect(() => {
      isModalRenameOpen()
    }, [isRenameModalOpen])

    return (
      <tr className={styles.wrapper}>
        <tr className={styles.employee_user}>
          <td className={styles.employee_user_info}>
            <img className={styles.employee_user_info_avatar} src={avatar} alt="User Avatar" />
            <div className={styles.employee_user_info_name}>
              <span>
                {userId !== id ? (
                  <>
                    {name} |
                    <button className={styles.changePseudonymBtn} onClick={handleChangePseudonym}>
                      Переименовать
                    </button>
                  </>
                ) : (
                  <>{name}</>
                )}
              </span>
              <span>{contact}</span>
            </div>
          </td>

          <td className={styles.employee_user_role}>{userRoleName[role]}</td>
          <td className={styles.employee_user_roleBtn}>
            {role === 'Teacher' && (
              <button className={styles.employee_user_roleBtn_btn} onClick={off}>
                Уч. группы
              </button>
            )}
            {contact === 'admin@coursehub.ru' || contact === 'teacher@coursehub.ru' ? (
              <button className={styles.employee_user_roleBtn_btn} disabled>
                <span style={{ color: 'red' }}>Роль постоянна</span>
              </button>
            ) : (
              <button className={styles.employee_user_roleBtn_btn} onClick={handleAddRole}>
                Упр. ролями
              </button>
            )}
          </td>
          <td className={styles.employee_user_roleBtn}>
            {userId === 154 || (userId !== 154 && contact !== 'admin@coursehub.ru' && contact !== 'teacher@coursehub.ru') ? (
              <button className={styles.employee_user_roleBtn_btn} onClick={handleDeleteEmployee}>
                Удалить
              </button>
            ) : (
              <button className={`${styles.employee_user_roleBtn_btn} ${styles.disabled}`} disabled>
                <span style={{ color: 'red' }}>Нельзя удалить</span>
              </button>
            )}
          </td>
        </tr>
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
        {isNewRoleModalOpen && id && school_id && (
          <Portal closeModal={toggleRenameModal}>
            <NewUserRole onClose={toggleNewRoleModal} userId={id} school_id={school_id} contact={contact} additional_roles={additional_roles} />
          </Portal>
        )}
        {isOpenLimitModal ? (
          <Portal closeModal={onToggle}>
            <LimitModal message={message} setShowLimitModal={onToggle} />
          </Portal>
        ) : null}
      </tr>
    )
  },
)
