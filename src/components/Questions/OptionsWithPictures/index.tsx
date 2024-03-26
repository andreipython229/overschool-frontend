import styles from './optionsWithPictures.module.scss'
import { Question } from '../Question'
import { AnswerOption } from '../AnswerOption'
import { QuestionHeader } from '../QuestionHeader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { addPictureIconPath } from '../config/svgIconPath'
import { InputBlock } from 'components/common/Input/InputBlock'
import { FC, MouseEvent, PointerEvent, useEffect, useState, useCallback, ChangeEvent } from 'react'
import { PropsQuestionBlockT } from '../../AddQuestion'
import { useBoolean } from '../../../customHooks'
import { useAddAnswerMutation } from '../../../api/questionsAndAnswersService'
import { useDragControls } from 'framer-motion'
import { Button } from '../../common/Button/Button'
import { orderBy } from 'lodash'
import { useDebounceFunc } from 'customHooks/useDebounceFunc'
import { usePatchAnswerMutation } from 'api/questionsAndAnswersService'

export const OptionsWithPictures: FC<PropsQuestionBlockT> = ({ question, title, answers, id, testId }) => {
  const [isOpen, { onToggle }] = useBoolean()
  const [answersToRender, setAnswersToRender] = useState(answers || [])
  const schoolName = window.location.href.split('/')[4]
  const [answersImages, setAnswersImages] = useState<{ [key: number]: File | null }>({});
  const isAddButtonVisible = answersToRender.length < 4;
  const [fileError, setFileError] = useState<string>('');
  const [addAnswer] = useAddAnswerMutation()
  const [patchAnswer] = usePatchAnswerMutation()
  const debounced = useDebounceFunc(patchAnswer, 1000)

  const controls = useDragControls()

  const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
    controls.start(event)
  }

  const handleChangeAnswer = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, answerId: number) => {
        setFileError('');
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.size <= 7 * 1024 * 1024) {
            setAnswersImages(prevState => {
                const updatedState = {
                    ...prevState,
                    [answerId]: file
                };
                const formData = new FormData();
                formData.append('question', id ? String(id) : '');
                formData.append('body', 'Введите ответ');
                formData.append('picture', file);

                fetch(`/api/${schoolName}/answers/${answerId}/`, {
                    method: 'PATCH',
                    body: formData,
                })
                    .then(response => {
                        setAnswersToRender(prevAnswers => {
                            const updatedAnswers = prevAnswers.map(answer => {
                                if (answer.answer_id === answerId) {
                                    return {
                                        ...answer,
                                        picture: URL.createObjectURL(file)
                                    };
                                } else {
                                    return answer;
                                }
                            });
                            return updatedAnswers;
                        });
                    })

                return updatedState;
            });
        } else {
              setFileError('Допустимый размер файла не должен превышать 7 МБ')
            }
            }
        }
    ,
        [debounced, id, schoolName, answersImages]

  );

  const handleAddAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const answerToAdd = {
      question: question?.question_id,
      image: File,
      body: 'Вариант ответа'
    }
    addAnswer({ body: answerToAdd, schoolName })
  }

  useEffect(() => {
    setAnswersToRender(answers || [])
    
  }, [answers])

  return (
    <div className={styles.wrapper}>
      <QuestionHeader title={title} id={id} isOpen={isOpen} onToggle={onToggle} testId={testId}>
        <div className={styles.wrapper_header_iconWrapper}>
          <div className={styles.wrapper_header_iconWrapper_iconColumn}>
            <span />
          </div>
          <div className={styles.wrapper_header_iconWrapper_iconColumn}>
            <span />
          </div>
        </div>
      </QuestionHeader>

      {isOpen && (
        <div className={styles.wrapper_optionsContent}>
          <div style={{ alignItems: 'center', marginLeft: '6%', width: '80%' }}>
            <Question id={id} title={title} testId={testId} />
        </div>
        <div className={styles.settings_list}>
            {fileError && <p className={styles.wrapper_answer_error}>{fileError}</p>}
            {answersToRender ? (
              orderBy(answersToRender, 'answer_id').map((answer, index) => (
                <div key={`${answer.body}_${index}`} className={styles.answerOptionContainer}>
                  {answer.picture && (
                    <>
                       <div style={{ marginBottom: '-25px', marginTop: '10px', marginLeft: '33%' }}>
                        <img src={answer.picture} alt="Selected Image" width={300} height={275} style={{ borderRadius: '10px', display: 'block' }}/>
                      </div>
                      <AnswerOption id={id} answer={answer}>
                        <div className={styles.wrapper_addPicturesBlock} style={{ opacity: 0 }}>
                          <InputBlock name={''} type={'file'} value={''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeAnswer(e, answer.answer_id)} />
                          <IconSvg width={25} height={22} viewBoxSize="0 0 25 22" path={addPictureIconPath} />
                        </div>
                    </AnswerOption>
                    </>
                  )}
                  {!answer.picture && (
                    <AnswerOption id={id} answer={answer}>
                        <div className={styles.wrapper_addPicturesBlock}>
                          <InputBlock name={''} type={'file'} value={''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeAnswer(e, answer.answer_id)} />
                          <IconSvg width={25} height={22} viewBoxSize="0 0 25 22" path={addPictureIconPath} />
                        </div>
                    </AnswerOption>
                  )}
                </div>
              ))
            ) : (
              ''
            )}
          </div>
          {isAddButtonVisible && (
            <Button
              text={'+ Добавить вариант'}
              style={{ marginTop: '26px', marginLeft: '38%', display: 'block' }}
              variant={'primary'}
              onClick={handleAddAnswer}
            />
        )}
      </div>
      )}
    </div>
  )
}
