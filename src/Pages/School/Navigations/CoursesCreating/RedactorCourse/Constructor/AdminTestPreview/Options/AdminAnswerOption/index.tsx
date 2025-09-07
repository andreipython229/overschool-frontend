import { FC, ReactNode } from 'react'

import styles from './adminAnswerOption.module.scss'
import { Avatar, Typography } from '@mui/material'
import { QuestionT } from 'components/AddQuestion'

type AnswerOptionT = {
  children?: ReactNode
  id?: number
  answer?: {
    answer_id?: number
    body?: string
    is_correct?: boolean
    picture?: string
  }
  multiple_answer: boolean
}

export const AdminAnswerOption: FC<AnswerOptionT> = ({ answer, multiple_answer }) => {
  return (
    <div className={styles.wrapper} key={answer?.answer_id}>
      <div className={styles.answerOptionsBlock}>
        <div className={answer?.picture ? styles.answerOptionsBlock_inputWrapperWithPicture : styles.answerOptionsBlock_inputWrapperWithoutPicture}>
          <div className={styles.grid_container}>
            <div>{multiple_answer ? <Avatar className={styles.avatar_square} variant="square" /> : <Avatar className={styles.avatar_rounded} />}</div>
            <div>
              <Typography className={styles.answer_body} variant="h6">
                {answer?.body}
              </Typography>
            </div>
          </div>
          {answer?.picture && (
            <div>
              <img src={answer.picture} alt="Answer" className={styles.answerImage} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
