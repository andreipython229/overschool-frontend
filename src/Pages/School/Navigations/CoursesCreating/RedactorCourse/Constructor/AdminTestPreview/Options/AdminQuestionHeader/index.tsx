import { FC, memo, ReactNode } from 'react'
import styles from './questionHeader.module.scss'
import { PropsQuestionBlockT } from '../../../../../../../../../components/AddQuestion'
import { Avatar } from '@mui/material'

type AdminQuestionHeaderT = {
  children?: ReactNode
}

export const AdminQuestionHeader: FC<AdminQuestionHeaderT & PropsQuestionBlockT> = memo(
  ({ title, children, questions, question, multiple_answer }) => {
    return (
      <div className={styles.header}>
        {children}
        <div className={styles.header_container}>
          <Avatar className={styles.avatar}>{questions && question && questions?.indexOf(question) + 1}</Avatar>
          <div>
            <h4 className={styles.header_title}>{title}</h4>
            {multiple_answer ? (
              <h3 className={styles.header_subtitle}>Выберите несколько вариантов ответа</h3>
            ) : (
              <h3 className={styles.header_subtitle}>Выберите один вариант ответа</h3>
            )}
          </div>
        </div>
      </div>
    )
  },
)
