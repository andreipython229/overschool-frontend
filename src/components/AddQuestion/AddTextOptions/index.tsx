import { FC, useEffect } from 'react'
import { AddQuestionOptionsT } from '../index'
import { useCreateQuestionsMutation } from 'api/questionsAndAnswersService'

import styles from './addTextOptions.module.scss'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { textOptionsIconPath } from '../config/svgIconPath'

export const AddTextOptions: FC<AddQuestionOptionsT> = ({ setTypeQuestions, setQuestions, questions, testId }) => {
  const [createOption, { data }] = useCreateQuestionsMutation()
  const schoolName = window.location.href.split('/')[4]
  const handleGetTypeQuestion = () => {
    setTypeQuestions('Text' as keyof object)
    createOption({
      question: {
        question_type: 'Text',
        body: 'Введите текст вопроса',
        is_any_answer_correct: false,
        only_whole_numbers: false,
        test: testId,
      },
      schoolName,
    })
  }

  useEffect(() => {
    if (data) {
      setQuestions([...questions, data])
    }
  }, [data])

  return (
    <button onClick={handleGetTypeQuestion} className={styles.wrapper}>
      <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={textOptionsIconPath} />
      <h4 className={styles.wrapper_title}>Вопрос с текстом</h4>
    </button>
  )
}
