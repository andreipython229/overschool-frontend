import styles from './optionsWithPictures.module.scss'
import { Question } from '../Question'
import { AnswerOption } from '../AnswerOption'
import { QuestionHeader } from '../QuestionHeader'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { addPictureIconPath } from '../config/svgIconPath'
import { InputBlock } from 'components/common/Input/InputBlock'
import { FC, MouseEvent, PointerEvent, useEffect, useState } from 'react'
import { PropsQuestionBlockT } from '../../AddQuestion'
import { useBoolean } from '../../../customHooks'
import { useAddAnswerMutation } from '../../../api/questionsAndAnswersService'
import { useDragControls } from 'framer-motion'
import { Button } from '../../common/Button/Button'

export const OptionsWithPictures: FC<PropsQuestionBlockT> = ({ question, title, answers, id, testId }) => {
  const [isOpen, { onToggle }] = useBoolean()
  const [answersToRender, setAnswersToRender] = useState(answers || [])
  const schoolName = window.location.href.split('/')[4]

  const [addAnswer] = useAddAnswerMutation()

  const controls = useDragControls()

  const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
    controls.start(event)
  }

  useEffect(() => {
    setAnswersToRender(answers || [])
  }, [answers])

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
          <Question id={id} title={title} testId={testId} />
          <AnswerOption>
            <div className={styles.wrapper_addPicturesBlock}>
              <InputBlock name={''} type={'file'} value={''} />
              <IconSvg width={25} height={22} viewBoxSize="0 0 25 22" path={addPictureIconPath} />
            </div>
          </AnswerOption>
          <Button
              text={'+ Добавить вариант'}
              style={{ marginTop: '26px' }}
              variant={'primary'}
              onClick={handleAddAnswer}
            />
        </div>
      )}
    </div>
  )
}
