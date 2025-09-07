import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { InputBlock } from 'components/common/Input/InputBlock'
import { addCommentsIconPath } from '../config/svgIconPath'
import { useDebounceFunc } from '../../../customHooks'
import { usePatchQuestionMutation } from 'api/questionsAndAnswersService'
import { PicturesAndOptions } from '../PicturesAndOptions'

import styles from './question.module.scss'
import { Radio } from 'components/common/Radio/Radio'

type QuestionT = {
  title?: string
  id?: string | number
  testId?: number
  children?: React.ReactNode
  multiple_answer?: boolean
}

export const Question: FC<QuestionT> = ({ children, id, title, testId, multiple_answer }) => {
  const [updateTitle, { data }] = usePatchQuestionMutation()
  const schoolName = window.location.href.split('/')[4]

  const [titleQuestion, setTitleQuestion] = useState<string>(data?.body || title || '')
  const [currentRadioValue, setCurrentRadioValue] = useState<string>(String(data?.multiple_answer) || String(multiple_answer) || '')
  const [multipleAnswer, setMultipleAnswer] = useState(data?.multiple_answer || multiple_answer || false)
  const debounced = useDebounceFunc(updateTitle)

  const handleChangeTitleQuestion = (event: ChangeEvent<HTMLInputElement>) => {
    const titleChange: string = event.target.value
    setTitleQuestion(titleChange)
  }

  useEffect(() => {
    if (titleQuestion !== title || multipleAnswer !== multiple_answer) {
      debounced({ titleQuestion, id: String(id), testId: String(testId), schoolName, multiple_answer: multipleAnswer })
    }
  }, [titleQuestion, multipleAnswer])

  useEffect(() => {
    if (data) {
      setTitleQuestion(data.body)
      setMultipleAnswer(data.multiple_answer)
      setCurrentRadioValue(String(data.multiple_answer))
    }
  }, [data])

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentRadioValue: string = e.target.value
    setCurrentRadioValue(currentRadioValue)
    if (currentRadioValue === 'true') {
      setMultipleAnswer(true)
    } else {
      setMultipleAnswer(false)
    }
  }

  return (
    <div className={styles.questionBlock}>
      <div className={styles.questionBlock_inputWrapper}>
        <InputBlock
          onChange={handleChangeTitleQuestion}
          id={id?.toString()}
          name={''}
          type={'text'}
          value={titleQuestion}
          placeholder="Введите вопрос"
        />
        {/* <div className={styles.questionBlock_inputWrapper_comment}>
                    <IconSvg width={19} height={19} viewBoxSize="0 0 19 19" path={addCommentsIconPath}>
                        <line x1="7.97656" y1="6.00781" x2="11.9531" y2="6.00781" stroke="#D4D7DD"
                              strokeLinecap="round"/>
                        <line x1="5.48828" y1="9.00781" x2="11.9531" y2="9.00781" stroke="#D4D7DD"
                              strokeLinecap="round"/>
                        <line x1="5.48828" y1="12.0078" x2="11.9531" y2="12.0078" stroke="#D4D7DD"
                              strokeLinecap="round"/>
                    </IconSvg>
                </div> */}
      </div>
      <div className={styles.radiobuttons}>
        <div className={styles.radiobuttons_radiobutton} style={{ maxWidth: '185px', width: '100%' }}>
          <Radio
            title={'один правильный ответ'}
            id={String(id) + 'false'}
            value="false"
            name={String(id)}
            onChange={handleRadioChange}
            checked={multiple_answer === false}
          />
          {!multipleAnswer && <h3 className={styles.radiobuttons_radiobutton_subtitle}>Выберите ответ, который будет верным</h3>}
        </div>
        <div className={styles.radiobuttons_radiobutton}>
          <Radio
            title={'несколько правильных ответов'}
            id={String(id) + 'true'}
            value="true"
            name={String(id)}
            onChange={handleRadioChange}
            checked={multiple_answer === true}
          />
          {multipleAnswer && <h3 className={styles.radiobuttons_radiobutton_subtitle}>Выберите неcколько ответов, которые будут верными</h3>}
        </div>
      </div>
      <p className={styles.questionBlock_addDescription}></p>
      {children}
    </div>
  )
}
