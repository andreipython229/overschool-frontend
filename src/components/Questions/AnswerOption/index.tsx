import { FC, memo, ReactNode, useState, ChangeEvent, useCallback } from 'react'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { InputBlock } from 'components/common/Input/InputBlock'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import { deleteIconPath, addCommentsIconPath, grabIconPath } from '../config/svgIconPath'
import { useDebounceFunc } from 'customHooks/useDebounceFunc'
import { usePatchAnswerMutation, useDeleteAnswerMutation } from 'api/questionsAndAnswersService'

import styles from './answerOption.module.scss'
import { QuestionT } from 'components/AddQuestion'

type AnswerOptionT = {
  children?: ReactNode
  id?: number
  answer?: {
    answer_id?: number
    body?: string
    is_correct?: boolean
  }
  question?: QuestionT
  multiple_answer?: boolean
}

export const AnswerOption: FC<AnswerOptionT> = memo(({ children, id, answer }) => {
  const [answerText, setAnswerText] = useState(answer?.body || '')
  const [isChecked, setIsChecked] = useState(answer?.is_correct || false)
  const schoolName = window.location.href.split('/')[4]

  const [patchAnswer] = usePatchAnswerMutation()
  const [deleteAnswer] = useDeleteAnswerMutation()

  const debounced = useDebounceFunc(patchAnswer, 1000)

  const handleChangeAnswer = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAnswerText(e.target.value)

      const answerToPatch = {
        question: id,
        body: e.target.value,
        is_correct: isChecked,
      }

      debounced({ answer: answerToPatch, answerId: String(answer?.answer_id), schoolName })
    },
    [debounced, id, setIsChecked, isChecked, answer?.answer_id, setAnswerText],
  )

  const handleDeleteAnswer = useCallback(() => {
    deleteAnswer({answerId: String(answer?.answer_id), schoolName})
  }, [answer?.answer_id, deleteAnswer])

  const handleCheckboxChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked
      setIsChecked(newChecked)
      const answerToPatch = {
        question: id,
        body: answerText,
        is_correct: newChecked,
      }
      debounced({ answer: answerToPatch, answerId: String(answer?.answer_id), schoolName })
    },
    [answer?.answer_id, answerText, debounced, id],
  )

  return (
    <div className={styles.wrapper} key={answer?.answer_id}>
      <div className={styles.answerOptionsBlock}>
        <div className={children ? `${styles.answerOptionsBlock_inputWrapper} ${styles.children}`: styles.answerOptionsBlock_inputWrapper}>
          {children}
          <div>
            <Checkbox id={`${id}`} checked={isChecked} onChange={handleCheckboxChange} />
            <div className={isChecked ? styles.answerOptionsBlock_inputWrapper_correctAnswerWrapper : ''}>
              <InputBlock
                id={`${id}-${answerText}`}
                name={''}
                type={'text'}
                value={answerText}
                placeholder={'Введите ответ'}
                onChange={handleChangeAnswer}
              />
           </div>
          {/* <div className={styles.answerOptionsBlock_inputWrapper_comment}>
                        <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={addCommentsIconPath}>
                            <line x1="7.97656" y1="6.00781" x2="11.9531" y2="6.00781" stroke="#D4D7DD"
                                  strokeLinecap="round"/>
                            <line x1="5.48828" y1="9.00781" x2="11.9531" y2="9.00781" stroke="#D4D7DD"
                                  strokeLinecap="round"/>
                            <line x1="5.48828" y1="12.0078" x2="11.9531" y2="12.0078" stroke="#D4D7DD"
                                  strokeLinecap="round"/>
                        </IconSvg>
                    </div> */}
            <div className={styles.answerOptionsBlock_inputWrapper_delete}>
              <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={deleteIconPath} functionOnClick={handleDeleteAnswer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
