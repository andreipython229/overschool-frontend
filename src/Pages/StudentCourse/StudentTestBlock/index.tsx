import { FC, useState } from 'react'
import { StudentQuestion } from './StudentQuestion'

import styles from './studentTestBlock.module.scss'

type questionListT = {
  attempt_count: number
  attempt_limit: boolean
  name: string
  questions: string
  show_right_answers: boolean
  test: string
}
export const StudentTestBlock: FC<any> = ({ lesson }) => {
  const [numberTest, setNumberTest] = useState<number>(0)
  return (
    <div className={styles.wrapper}>
      <StudentQuestion questions={lesson.questions[numberTest]} length={lesson.questions} numberTest={numberTest} setNumberTest={setNumberTest} />
    </div>
  )
}
