import styles from './picturesAndOptions.module.scss'
import { Question } from '../Question'
import { AnswerOption } from '../AnswerOption'
import { QuestionHeader } from '../QuestionHeader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { InputBlock } from 'components/common/Input/InputBlock'
import { PropsQuestionBlockT } from '../../AddQuestion'
import { FC, MouseEvent, PointerEvent, useEffect, useState, useCallback } from 'react'
import { useAddAnswerMutation, useRemoveQuestionsMutation } from '../../../api/questionsAndAnswersService'
import { useDragControls } from 'framer-motion'
import { usePatchAnswerMutation } from 'api/questionsAndAnswersService'
import { Button } from '../../common/Button/Button'
import { orderBy } from 'lodash'
import { picturesOptionsIconPath } from 'components/AddQuestion/config/svgIconPath'

export const PicturesAndOptions: FC<PropsQuestionBlockT> = ({ question, title, answers, id, testId, questions, multiple_answer }) => {
  const [questionState, setQuestionState] = useState(question)
  const [answersToRender, setAnswersToRender] = useState(answers || [])
  const schoolName = window.location.href.split('/')[4]
  const [questionImage, setQuestionImage] = useState<string | null>(null)
  // const isAddButtonVisible = answersToRender.length < 4;
  const [fileError, setFileError] = useState<string>('')
  const [deleteQuestion] = useRemoveQuestionsMutation()
  const [addAnswer] = useAddAnswerMutation()
  const [patchAnswer] = usePatchAnswerMutation()

  const controls = useDragControls()

  const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
    controls.start(event)
  }

  const handleChangeQuestion = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
      setFileError('')
      const files = event.target.files
      if (files && files.length > 0) {
        const file = files[0]
        if (file.size <= 7 * 1024 * 1024) {
          const formData = new FormData()
          formData.append('question', questionId.toString())
          formData.append('body', 'Введите вопрос')
          formData.append('picture', file)

          if (testId) {
            formData.append('test', testId.toString())
          }

          fetch(`/api/${schoolName}/questions/${questionId}/`, {
            method: 'PATCH',
            body: formData,
          }).then(response => {
            setQuestionImage(URL.createObjectURL(file))
          })
        } else {
          setFileError('Допустимый размер файла не должен превышать 7 МБ')
        }
      }
    },
    [schoolName],
  )

  useEffect(() => {
    setQuestionState(question)
    if (question?.picture) {
      setQuestionImage(question.picture)
    }
  }, [question])

  const handleAddAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const answerToAdd = {
      question: question?.question_id,
      image: File,
      body: 'Вариант ответа',
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
    <div className={styles.wrapper}>
      <div className={styles.wrapper_button}>
        <Button onClick={handleGetTypeQuestion} variant={'cancel'} text={'Удалить'} />
      </div>
      <h2 className={styles.wrapper_question_count}>
        Вопрос {questions && question && questions?.indexOf(question) + 1} из {questions?.length}
      </h2>
      <div className={styles.wrapper_drop_down_menu}>
        <h2 className={styles.wrapper_drop_down_menu_question_count}>
          Вопрос {questions && question && questions?.indexOf(question) + 1} из {questions?.length}
        </h2>
        <div style={{ width: '100%', maxWidth: '485px', alignSelf: 'center' }}>
          <QuestionHeader title={title} id={id} testId={testId} questions={questions} question={question} multiple_answer={multiple_answer} />
        </div>

        <div className={styles.wrapper_optionsContent}>
          <Question id={id} title={title} testId={testId} multiple_answer={multiple_answer}>
            <div className={styles.wrapper_optionsContent_addPicture}>
              {questionImage ? (
                <div style={{ marginBottom: '10px' }}>
                  <img src={questionImage} alt="Question Image" width={180} height={82} style={{ borderRadius: '16px', display: 'block' }} />
                </div>
              ) : (
                <>
                  <div className={styles.wrapper_optionsContent_addPicture_iconWrapper}>
                    <InputBlock
                      name={''}
                      type={'file'}
                      value={''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeQuestion(e, question?.question_id ?? 0)}
                    />
                    <div style={{ flexDirection: 'column', margin: '0 auto' }}>
                      <IconSvg className={styles.fillColorBlue} width={24} height={24} viewBoxSize="0 0 24 24" path={picturesOptionsIconPath} />
                      <h5 className={styles.upload_title}>Загрузите изображение</h5>
                    </div>
                  </div>
                </>
              )}
            </div>
            {fileError && <p className={styles.wrapper_answer_error}>{fileError}</p>}
          </Question>
          {answersToRender
            ? orderBy(answersToRender, 'answer_id').map((answer, index) => (
                <div key={`${answer.body}_${index}`} className={styles.answerOptionContainer}>
                  <AnswerOption id={id} answer={answer} multiple_answer={multiple_answer || false} question={question} />
                </div>
              ))
            : ''}
          {/* {isOpen && isAddButtonVisible && ( */}
          <Button
            text={'+ Добавить вариант'}
            style={{ lineHeight: '16.71px', fontWeight: '600', fontSize: '14px', marginTop: '10px' }}
            variant={'newPrimary'}
            onClick={handleAddAnswer}
          />
          {/* )} */}
        </div>
      </div>
    </div>
  )
}
