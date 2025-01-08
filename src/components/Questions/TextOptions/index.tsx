import { FC, MouseEvent, useState, useEffect } from 'react'
import { orderBy } from 'lodash'
import { AnswerOption } from '../AnswerOption'
import { QuestionHeader } from '../QuestionHeader'
import { PropsQuestionBlockT } from 'components/AddQuestion'
import { Button } from '../../common/Button/Button'
import { useAddAnswerMutation, useRemoveQuestionsMutation } from 'api/questionsAndAnswersService'

import styles from './previewtextOptions.module.scss'
import { SimpleLoader } from 'components/Loaders/SimpleLoader'

export const TextOptions: FC<PropsQuestionBlockT> = ({ question, answers, title, id, testId, questions, multiple_answer }) => {
  const [answersToRender, setAnswersToRender] = useState(answers || [])
  const [deleteQuestion] = useRemoveQuestionsMutation()
  const schoolName = window.location.href.split('/')[4]

  const [addAnswer, { isLoading }] = useAddAnswerMutation()

  const handleAddAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const answerToAdd = {
      question: question?.question_id,
      body: 'Введите ответ',
    }
    addAnswer({ body: answerToAdd, schoolName })
  }

  useEffect(() => {
    setAnswersToRender(answers || [])
  }, [answers])

  const handleGetTypeQuestion = async () => {
    await deleteQuestion({ id: Number(id), schoolName })
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Button
          onClick={handleGetTypeQuestion}
          variant={'cancel'}
          text={'Удалить'}
          style={{ fontSize: '16px', padding: '6px 21px', position: 'absolute', top: '20px', right: '20px' }}
        />
        <h2 className={styles.wrapper_question_count}>Вопрос {questions && question && questions?.indexOf(question)+1} из {questions?.length}</h2>
        <div className={styles.wrapper_drop_down_menu}>
          <h2 className={styles.wrapper_drop_down_menu_question_count}>Вопрос {questions && question && questions?.indexOf(question)+1} из {questions?.length}</h2>
          <QuestionHeader title={title} id={id} testId={testId} questions={questions} question={question} multiple_answer={multiple_answer} />
          <div>
            <div className={styles.settings_list}>
              {answersToRender
                ? orderBy(answersToRender, 'answer_id').map((answer, index) => (
                  <AnswerOption key={`${answer.body}_${index}`} id={id} answer={answer} question={question} multiple_answer={multiple_answer || false}/>
                ))
                : ''}
            </div>
            <Button
              text={isLoading ? <SimpleLoader style={{width: '1em', height: '1em'}}/> : '+ Добавить вариант'}
              style={{ lineHeight: '16.71px', fontWeight: '600', fontSize: '14px', marginTop: '10px' }}
              variant={'newPrimary'}
              onClick={handleAddAnswer}
            />
          </div>
        </div>
      </div>
    </>
  )
}
