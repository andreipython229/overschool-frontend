import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { InputBlock } from 'components/common/Input/InputBlock'
import { addCommentsIconPath } from '../config/svgIconPath'
import { useDebounceFunc } from '../../../customHooks'
import { usePatchQuestionMutation } from 'api/questionsAndAnswersService'
import { PicturesAndOptions } from '../PicturesAndOptions'

import styles from './question.module.scss'

type QuestionT = {
  title?: string
  id?: string | number
  testId?: number
  children?: React.ReactNode;
}

export const Question: FC<QuestionT> = ({ children, id, title, testId }) => {
  const [updateTitle, { data }] = usePatchQuestionMutation()
  const schoolName = window.location.href.split('/')[4]

  const [titleQuestion, setTitleQuestion] = useState<string>(data?.body || title || '')

  const debounced = useDebounceFunc(updateTitle)

  const handleChangeTitleQuestion = (event: ChangeEvent<HTMLInputElement>) => {
    const titleChange: string = event.target.value
    setTitleQuestion(titleChange)
  }

  useEffect(() => {
    if (titleQuestion !== title) {
      debounced({ titleQuestion, id: String(id), testId: String(testId), schoolName })
    }
  }, [titleQuestion])

  useEffect(() => {
    if (data) {
      setTitleQuestion(data.body)
    }
  }, [data])

  return (
    <div className={styles.questionBlock}>
      <h4 className={styles.questionBlock_title}>Введите вопрос:</h4>
      <div className={styles.questionBlock_inputWrapper}>
        <InputBlock onChange={handleChangeTitleQuestion} id={id?.toString()} name={''} type={'text'} value={titleQuestion} />
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
      <p className={styles.questionBlock_addDescription}></p>
      {children}
    </div>
  )
}
