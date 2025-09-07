import React, { FC, FormEvent, memo, useState, useEffect, useRef } from 'react'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { useAssignRoleMutation, useRemoveRoleMutation } from 'api/schoolService'
import { Toast } from 'primereact/toast'
import styles from './newUserRole.module.scss'

interface NewUserRoleProps {
  school_id: number
  userId: number
  additional_roles?: string[]
  contact: string
  onClose: () => void
}

const roleTranslation: { [key: string]: string } = {
  Администратор: 'Администратор',
  Студент: 'Студент',
  Помощник: 'Помощник',
}

const allRoles = ['Администратор', 'Студент', 'Помощник']

export const NewUserRole: FC<NewUserRoleProps> = memo(({ school_id, userId, additional_roles, contact, onClose }) => {
  const toast = useRef<Toast>(null)
  const [selectedRole, setSelectedRole] = useState('Администратор')
  const [assignRole, { isLoading: isAssignLoading, error: assignError }] = useAssignRoleMutation()
  const [removeRole, { isLoading: isRemoveLoading, error: removeError }] = useRemoveRoleMutation()

  useEffect(() => {
    if (selectedRole === 'Студент') {
      toast.current?.show({
        severity: 'warn',
        summary: 'Предупреждение',
        detail:
          'Обратите внимание, если вы хотите выдать роль "Студент", убедитесь, что аккаунт student@coursehub.ru находится на одном из ваших курсов. Иначе функционал работы с курсами будет недоступен.',
        life: 10000,
      })
    }
  }, [selectedRole])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (selectedRole) {
        const response = await assignRole({
          school_id: school_id,
          user_id: userId,
          role_name: selectedRole,
        })

        if ('error' in response) {
          const error = response.error as { data?: { error?: { type?: string; message?: string } } }
          const errorMessage = error.data?.error?.message || 'Попробуйте позже'

          toast.current?.show({
            severity: 'error',
            summary: `Ошибка`,
            detail: `Ошибка при выдаче роли: ${errorMessage}`,
            life: 5000,
          })
        } else {
          toast.current?.show({
            severity: 'success',
            summary: `Роль выдана`,
            detail: `Вы успешно выдали роль ${selectedRole} сотруднику ${contact}`,
            life: 5000,
          })
        }
      } else {
        toast.current?.show({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Роль не выбрана',
          life: 5000,
        })
        console.log('Роль не выбрана')
      }
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Ошибка',
        detail: `Ошибка при выдаче роли: ${error}`,
        life: 5000,
      })
      console.error('Ошибка при выдаче новой роли:', error)
    }
  }

  const handleRevokeRole = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (selectedRole) {
        await removeRole({
          school_id: school_id,
          user_id: userId,
          role_name: selectedRole,
        })
        toast.current?.show({
          severity: 'success',
          summary: `Роль отозвана`,
          detail: `Вы успешно отозвали роль ${selectedRole} у сотрудника ${contact}`,
          life: 5000,
        })
      } else {
        toast.current?.show({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Роль не выбрана',
          life: 5000,
        })
        console.log('Роль не выбрана')
      }
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Ошибка',
        detail: `Ошибка при отзыве роли: ${error}`,
        life: 5000,
      })
      console.error('Ошибка при отзыве роли:', error)
    }
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Управление ролями сотрудника {contact}</h2>
          <div className={styles.closedModal} onClick={onClose}>
            <IconSvg width={30} height={30} viewBoxSize="0 0 64 64" path={crossIconPath} />
          </div>
        </div>
        <p>Дополнительные роли пользователя: </p>
        {additional_roles && Array.isArray(additional_roles) && additional_roles.length > 0 ? (
          <div>{additional_roles.join(', ')}</div>
        ) : (
          <p>Пока нет ролей</p>
        )}
        <br />
        <form onSubmit={handleSubmit}>
          <div className={styles.labelContainer}>
            <label>Выберите роль:</label>
            <div className={styles.selectContainer}>
              <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                {allRoles.map(roleKey => (
                  <option key={roleKey} value={roleKey}>
                    {roleTranslation[roleKey]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Выдать роль
            </button>
            <button className={styles.revokeButton} onClick={handleRevokeRole}>
              Отозвать роль
            </button>
          </div>
        </form>
      </div>
      <Toast position="bottom-left" ref={toast} style={{ marginLeft: '100px' }} />
    </div>
  )
})
