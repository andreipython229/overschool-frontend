import styles from './numericalTask.module.scss'
import { Question } from '../Question'
import { AnswerOption } from '../AnswerOption'
import { QuestionHeader } from '../QuestionHeader'
import { Checkbox } from 'components/common/Checkbox/Checkbox'

export const NumericalTask = () => {
  return (
    <div className={styles.wrapper}>
      <QuestionHeader>
        <div className={styles.wrapper_header_iconWrapper}>
          <div className={styles.wrapper_header_iconWrapper_icon}>
            <span>123</span>
          </div>
        </div>
      </QuestionHeader>
      <div className={styles.wrapper_optionsContent}>
        <Question />
        <Checkbox>Только целые числа</Checkbox>
        <Checkbox>Правильный ответ в диапазоне</Checkbox>
        <AnswerOption />
      </div>
    </div>
  )
}
