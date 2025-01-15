import { FC } from 'react'
import { AddQuestionOptionsT } from '../index'

import styles from './addOptionsWithPictures.module.scss'
import { useCreateQuestionsMutation } from '../../../api/questionsAndAnswersService'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { picturesOptionsIconPath } from '../config/svgIconPath'

export const AddOptionsWithPictures: FC<AddQuestionOptionsT> = ({ setTypeQuestions, testId, setQuestions, questions }) => {
  const [createOption, { data }] = useCreateQuestionsMutation()
  const schoolName = window.location.href.split('/')[4]
  const handleGetTypeQuestion = () => {
    setTypeQuestions('TextPic' as keyof object)
    createOption({
      question: {
        question_type: 'TextPic',
        body: 'Введите вопрос (ответы с картинками)',
        is_any_answer_correct: false,
        only_whole_numbers: false,
        test: testId,
      },
      schoolName,
    })
  }

  return (
    <button onClick={handleGetTypeQuestion} className={styles.wrapper}>
      <IconSvg width={24} height={24} viewBoxSize="0 0 24 24" path={picturesOptionsIconPath} />
      <h4 className={styles.wrapper_title}>Вопрос с картинками</h4>
    </button>
  )
}
