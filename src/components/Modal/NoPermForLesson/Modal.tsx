import React, { FC } from 'react'
import { Button } from 'components/common/Button/Button'
import { Modal } from 'components/common/Modal/Modal'
import styles from './noPermForLesson.module.scss'

type NoPermForLessonProps = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

export const NoPermForLesson: FC<NoPermForLessonProps> = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Нет доступа к уроку" variant="warning" width="500px">
      <div className={styles.content}>
        {children}
        <div className={styles.actions}>
          <Button onClick={onClose} color="primary" text="Закрыть" />
        </div>
      </div>
    </Modal>
  )
}
