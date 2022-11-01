import { Question } from '../Question'
import { AnswerOption } from '../AnswerOption'
import { QuestionHeader } from '../QuestionHeader'
import { FC } from 'react'
import { PropsQuestionBlockT } from 'components/AddQuestion'
import { useBoolean } from '../../../customHooks'
import { Reorder, useDragControls } from 'framer-motion'

import styles from './textOptions.module.scss'

export const TextOptions: FC<PropsQuestionBlockT> = ({ question, title, id }) => {
  const [isOpen, { onToggle }] = useBoolean()

  const controls = useDragControls()

  const onPointerDown = (event: any) => {
    controls.start(event)
  }

  return (
    <Reorder.Item
      dragControls={controls}
      dragListener={false}
      draggable={false}
      key={id}
      value={question}
      as="div"
      className={styles.wrapper}
      whileDrag={{
        scale: 1.1,
        boxShadow: 'rgba(0,0,0, 0.12) 0px 1px 3px, rgba(0,0,0, 0.24) 0px 1px 2px',
        borderRadius: '7px',
      }}
    >
      <QuestionHeader onPointerDown={onPointerDown} title={title} id={id} isOpen={isOpen} onToggle={onToggle}>
        <div className={styles.wrapper_header_iconWrapper}>
          <div className={styles.wrapper_header_iconWrapper_iconRow}>
            <span />
          </div>
          <div className={styles.wrapper_header_iconWrapper_iconRow}>
            <span />
          </div>
          <div className={styles.wrapper_header_iconWrapper_iconRow}>
            <span />
          </div>
        </div>
      </QuestionHeader>
      <div className={styles.wrapper_optionsContent}>
        {isOpen && (
          <>
            <Question />
            <AnswerOption />
          </>
        )}
      </div>
    </Reorder.Item>
  )
}
