import React, { FC, FormEvent, memo, useState, useEffect } from 'react';
import { IconSvg } from 'components/common/IconSvg/IconSvg';
import { crossIconPath } from 'config/commonSvgIconsPath';
import { useUpdateUserPseudonymMutation } from 'api/schoolService';
import styles from './newUserRole.module.scss';

interface NewUserRoleProps {
    school_id: string;
    schoolName: string;
    userId: number;
    role: string;
    onClose: () => void;
}

const roleTranslation: { [key: string]: string } = {
    'Admin': 'Администратор',
    'Student': 'Студент',
    'Teacher': 'Помощник',
};

const allRoles = ['Admin', 'Student', 'Teacher'];

export const NewUserRole: FC<NewUserRoleProps> = memo(({ school_id, schoolName, userId, role, onClose }) => {
    const [selectedRole, setSelectedRole] = useState('');
    const [updateUserPseudonym, { isLoading, error }] = useUpdateUserPseudonymMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updateUserPseudonym({
                schoolName: schoolName,
                school: Number(school_id),
                pseudonym: selectedRole,
                user: userId
            });
            onClose();
        } catch (error) {
            console.error('Ошибка при обновлении псевдонима:', error);
        }
    };

    const handleRevokeRole = async (e: FormEvent) => {
      e.preventDefault();
      try {
          await updateUserPseudonym({
              schoolName: schoolName,
              school: Number(school_id),
              pseudonym: selectedRole,
              user: userId
          });
          onClose();
      } catch (error) {
          console.error('Ошибка при обновлении псевдонима:', error);
      }
  };

    useEffect(() => {
      console.log(role);
    }, [role]);

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Управление ролями сотрудника</h2>
                    <div className={styles.closedModal} onClick={onClose}>
                        <IconSvg width={14} height={14} viewBoxSize="0 0 14 14" path={crossIconPath} />
                    </div>
                </div>
                <p>Платформа: {schoolName}</p>
                <form onSubmit={handleSubmit}>
                  <div className={styles.labelContainer}>
                      <label>Выберите роль:</label>
                      <div className={styles.selectContainer}>
                          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                              {allRoles.map(roleKey => (
                                  <option key={roleKey} value={roleKey}>
                                      {roleTranslation[roleKey]}
                                  </option>
                              ))}
                          </select>
                      </div>
                  </div>
                  <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>Выдать роль</button>
                    <button type="button" className={styles.revokeButton} onClick={handleRevokeRole}>Отозвать роль</button>
                </div>
              </form>
            </div>
        </div>
    );
});
