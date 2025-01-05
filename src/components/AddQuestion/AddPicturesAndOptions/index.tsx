import { FC } from 'react'
import { AddQuestionOptionsT } from '../index'

import styles from './addPicturesAndOptions.module.scss'
import { useCreateQuestionsMutation } from '../../../api/questionsAndAnswersService'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { textOptionsIconPath } from '../config/svgIconPath'

export const AddPicturesAndOptions: FC<AddQuestionOptionsT> = ({ setTypeQuestions, testId, setQuestions, questions }) => {
  const [createOption, { data }] = useCreateQuestionsMutation()
  const schoolName = window.location.href.split('/')[4]
  const handleGetTypeQuestion = () => {
    setTypeQuestions('TextPics' as keyof object)
    createOption({
      question: {
        question_type: 'TextPics',
        body: 'Вопрос с картинкой',
        is_any_answer_correct: false,
        only_whole_numbers: false,
        test: testId,
      },
      schoolName,
    })
  }
  return (
    <button onClick={handleGetTypeQuestion} className={styles.wrapper}>
      <div className={styles.wrapper_iconWrapper}>
        <div className={styles.wrapper_iconWrapper_iconColumn}>
          <span />
        </div>
        <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={textOptionsIconPath} />
      </div>
      <h4 className={styles.wrapper_title}>Картинка и варианты</h4>
    </button>
  )
}
