import React, { FC, FormEvent, memo, useEffect, useState } from 'react'

import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { crossIconPath } from 'config/commonSvgIconsPath'
import { useUpdateUserPseudonymMutation } from 'api/schoolService'
import styles from './renameEmployee.module.scss'
import { Button } from '../../common/Button/Button'
import { Input } from '../../common/Input/Input/Input'

interface RenameEmployeeProps {
  school_id: string
  schoolName: string
  userId: number
  onClose: () => void
}

export const RenameEmployee: FC<RenameEmployeeProps> = memo(({ school_id, schoolName, userId, onClose }) => {
  const [newName, setNewName] = useState('')
  const [updateUserPseudonym, { isLoading, error }] = useUpdateUserPseudonymMutation()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await updateUserPseudonym({
        schoolName: schoolName,
        school: Number(school_id),
        pseudonym: newName,
        user: userId,
      })
      onClose()
    } catch (error) {
      console.error('Ошибка при обновлении псевдонима:', error)
    }
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Переименовать сотрудника</h2>
          <div className={styles.closedModal} onClick={onClose}>
            <IconSvg width={30} height={30} viewBoxSize="0 0 64 64" path={crossIconPath} />
          </div>
        </div>
        <p>Платформа: {schoolName}</p>
        <form onSubmit={handleSubmit}>
          <label>Введите новый псевдоним:</label>
          <Input name="rename" type="text" onChange={e => setNewName(e.target.value)} value={newName} placeholder="Введите новый псевдоним" />
          <button type="submit" className={styles.submitButton}>
            Переименовать
          </button>
        </form>
      </div>
    </div>
  )
})
