import styles from './optionsWithPictures.module.scss'
import { AnswerOption } from '../AnswerOption'
import { QuestionHeader } from '../QuestionHeader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { InputBlock } from 'components/common/Input/InputBlock'
import { FC, MouseEvent, PointerEvent, useEffect, useState, useCallback } from 'react'
import { PropsQuestionBlockT } from '../../AddQuestion'
import { useAddAnswerMutation, useRemoveQuestionsMutation } from '../../../api/questionsAndAnswersService'
import { useDragControls } from 'framer-motion'
import { Button } from '../../common/Button/Button'
import { orderBy } from 'lodash'
import { useDebounceFunc } from 'customHooks/useDebounceFunc'
import { usePatchAnswerMutation } from 'api/questionsAndAnswersService'
import { picturesOptionsIconPath } from 'components/AddQuestion/config/svgIconPath'

export const OptionsWithPictures: FC<PropsQuestionBlockT> = ({ question, title, answers, id, testId, questions }) => {
  const [answersToRender, setAnswersToRender] = useState(answers || [])
  const schoolName = window.location.href.split('/')[4]
  const [answersImages, setAnswersImages] = useState<{ [key: number]: File | null }>({})
  // const isAddButtonVisible = answersToRender.length < 4
  const [fileError, setFileError] = useState<string>('')
  const [addAnswer] = useAddAnswerMutation()
  const [patchAnswer] = usePatchAnswerMutation()
  const debounced = useDebounceFunc(patchAnswer, 1000)
  const [deleteQuestion] = useRemoveQuestionsMutation()

  const controls = useDragControls()

  const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
    controls.start(event)
  }

  const handleChangeAnswer = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, answerId: number) => {
      setFileError('')
      const files = event.target.files
      if (files && files.length > 0) {
        const file = files[0]
        if (file.size <= 7 * 1024 * 1024) {
          setAnswersImages(prevState => {
            const updatedState = {
              ...prevState,
              [answerId]: file,
            }
            const formData = new FormData()
            formData.append('question', id ? String(id) : '')
            formData.append('body', 'Введите ответ')
            formData.append('picture', file)

            patchAnswer({ answer: formData, answerId: answerId, schoolName }).then(response => {
              setAnswersToRender(prevAnswers => {
                const updatedAnswers = prevAnswers.map(answer => {
                  if (answer.answer_id === answerId) {
                    return {
                      ...answer,
                      picture: URL.createObjectURL(file),
                    }
                  } else {
                    return answer
                  }
                })
                return updatedAnswers
              })
            })

            return updatedState
          })
        } else {
          setFileError('Допустимый размер файла не должен превышать 7 МБ')
        }
      }
    },
    [debounced, id, schoolName, answersImages],
  )

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
      <Button
        onClick={handleGetTypeQuestion}
        variant={'cancel'}
        text={'Удалить'}
        style={{ fontSize: '16px', padding: '6px 21px', position: 'absolute', top: '20px', right: '20px' }}
      />
      <h2 className={styles.wrapper_question_count}>Вопрос {questions && question && questions?.indexOf(question)+1} из {questions?.length}</h2>
      <div className={styles.wrapper_drop_down_menu}>
        <h2 className={styles.wrapper_drop_down_menu_question_count}>Вопрос {questions && question && questions?.indexOf(question)+1} из {questions?.length}</h2>
        <div style={{width: '100%', maxWidth: '485px', alignSelf: 'center'}}>
          <QuestionHeader title={title} id={id} testId={testId} questions={questions} question={question} />
        </div>

        <div className={styles.wrapper_optionsContent}>
          <div className={styles.settings_list}>
            {fileError && <p className={styles.wrapper_answer_error}>{fileError}</p>}
            {answersToRender
              ? orderBy(answersToRender, 'answer_id').map((answer, index) => (
                  <div key={`${answer.body}_${index}`} className={styles.answerOptionContainer}>
                    {answer.picture && (
                      <>
                        <div style={{marginBottom: '10px'}}>
                          <img
                            src={answer.picture}
                            alt="Selected Image"
                            width={180}
                            height={82}
                            style={{ borderRadius: '16px', display: 'block' }}
                          />
                        </div>
                        <AnswerOption id={id} answer={answer}>
                          <div className={styles.wrapper_addPicturesBlock} style={{ display: 'none' }}>
                            <InputBlock
                              name={''}
                              type={'file'}
                              value={''}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeAnswer(e, answer.answer_id)}
                            />
                            <IconSvg className={styles.fillColorBlue} width={24} height={24} viewBoxSize="0 0 24 24" path={picturesOptionsIconPath} />
                          </div>
                        </AnswerOption>
                      </>
                    )}
                    {!answer.picture && (
                      <AnswerOption id={id} answer={answer}>
                        <div className={styles.wrapper_addPicturesBlock}>
                          <InputBlock
                            name={''}
                            type={'file'}
                            value={''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeAnswer(e, answer.answer_id)}
                          />
                          <div style={{flexDirection: 'column', margin: '0 auto'}}>
                            <IconSvg className={styles.fillColorBlue} width={24} height={24} viewBoxSize="0 0 24 24" path={picturesOptionsIconPath} />
                            <h5 className={styles.upload_title}>Загрузите изображение</h5>
                          </div>
                        </div>
                      </AnswerOption>
                    )}
                  </div>
                ))
              : ''}
          </div>
          {/* {isAddButtonVisible && ( */}
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
