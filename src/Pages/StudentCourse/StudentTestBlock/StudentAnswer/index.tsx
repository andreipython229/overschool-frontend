import { FC, useState, useEffect, useRef } from 'react'
import { Checkbox } from 'components/common/Checkbox/Checkbox'
import styles from './studentAnswer.module.scss'
import { AnswersT } from '../../../../components/AddQuestion'

type StudentAnswerProps = {
  id: string
  title: string
  name: string
  onSelect: (answerCorrect: boolean, answer_id: string, title: string) => void
  isCorrect: boolean
  picture?: string
  resetSelection: boolean
}

export const StudentAnswer: FC<StudentAnswerProps> = ({ id, title, name, onSelect, isCorrect, picture, resetSelection }) => {
  const [selected, setSelected] = useState<boolean>(false)
  const prevResetSelection = useRef<boolean>(false)

  useEffect(() => {
    if (prevResetSelection.current !== resetSelection) {
      setSelected(false)
      prevResetSelection.current = resetSelection
    }
  }, [resetSelection])

  const handleSelect = () => {
    setSelected(!selected)
    onSelect(isCorrect, id, title)
  }

  return (
    <div className={styles.wrapper} onClick={handleSelect}>
      {picture && (
        <div className={styles.wrapper_imageBorder}>
          <img src={picture} alt={title} className={styles.wrapper_imageBorder_image} />
        </div>
      )}
      <div className={styles.answer}>
        <Checkbox checked={selected} />
        <span className={styles.answerTitle}>{title}</span>
      </div>
    </div>
  )
}
