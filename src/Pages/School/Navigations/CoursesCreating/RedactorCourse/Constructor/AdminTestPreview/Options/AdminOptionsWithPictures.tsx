import { FC, useState, useEffect } from 'react'
import { orderBy } from 'lodash'
import { PropsQuestionBlockT } from 'components/AddQuestion'
import styles from '../../../../../../../../components/Questions/OptionsWithPictures/adminOptionsWithPictures.module.scss'
import { AdminQuestionHeader } from './AdminQuestionHeader'
import { AdminAnswerOption } from './AdminAnswerOption'

export const AdminOptionsWithPictures: FC<PropsQuestionBlockT> = ({ questions, answers, title, id, question, multiple_answer }) => {
  const [answersToRender, setAnswersToRender] = useState(answers || [])

  useEffect(() => {
    setAnswersToRender(answers || [])
  }, [answers])

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.wrapper_question_count}>
          Вопрос {questions && question && questions?.indexOf(question) + 1} из {questions?.length}
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '490px', width: '100%' }}>
          <AdminQuestionHeader title={title} id={id} questions={questions} question={question} multiple_answer={multiple_answer} />
        </div>
        <div className={styles.wrapper_drop_down_menu}>
          <div className={styles.settings_list}>
            {answersToRender
              ? orderBy(answersToRender, 'answer_id').map((answer, index) => (
                  <AdminAnswerOption key={`${answer.body}_${index}`} id={index} answer={answer} multiple_answer={multiple_answer || false} />
                ))
              : ''}
          </div>
        </div>
      </div>
    </>
  )
}
