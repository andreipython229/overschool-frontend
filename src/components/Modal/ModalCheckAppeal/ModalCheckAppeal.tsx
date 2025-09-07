import React, { FC } from 'react'
import { Button } from 'components/common/Button/Button'
import { Modal } from 'components/common/Modal/Modal'
import styles from './modalCheckAppeal.module.scss'

type ModalCheckAppealProps = {
  isOpen: boolean
  onClose: () => void
  appeal: any
  onApprove: () => void
  onReject: () => void
}

export const ModalCheckAppeal: FC<ModalCheckAppealProps> = ({ isOpen, onClose, appeal, onApprove, onReject }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Проверка апелляции" variant="gradient" width="600px">
      <div className={styles.content}>
        <div className={styles.section}>
          <h3>Информация об апелляции</h3>
          <p>{appeal?.description}</p>
        </div>

        {appeal?.attachments && appeal.attachments.length > 0 && (
          <div className={styles.section}>
            <h3>Прикрепленные файлы</h3>
            <ul className={styles.attachmentsList}>
              {appeal.attachments.map((attachment: any) => (
                <li key={attachment.id}>
                  <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                    {attachment.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.actions}>
          <Button onClick={onReject} color="primary" text="Отклонить" />
          <Button onClick={onApprove} color="primary" text="Одобрить" />
        </div>
      </div>
    </Modal>
  )
}
