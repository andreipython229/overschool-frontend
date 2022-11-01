import { Question } from '../Question'
import { AnswerOption } from '../AnswerOption'
import { QuestionHeader } from '../QuestionHeader'
import { FC, PointerEvent } from 'react'
import { AnswersT, PropsQuestionBlockT } from 'components/AddQuestion'
import { useBoolean } from '../../../customHooks'
import { Reorder, useDragControls } from 'framer-motion'
import { Button } from '../../common/Button/Button'

import styles from './textOptions.module.scss'

export const TextOptions: FC<PropsQuestionBlockT> = ({ question, answers, title, id }) => {
  const [isOpen, { onToggle }] = useBoolean()

  const controls = useDragControls()

  const onPointerDown = (event: PointerEvent<SVGSVGElement | SVGPathElement>) => {
    controls.start(event)
  }

  return (
    <>
      <Reorder.Item
        className={styles.wrapper}
        dragControls={controls}
        dragListener={false}
        draggable={false}
        key={id}
        value={question}
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
      </Reorder.Item>

      {isOpen && (
        <div className={styles.wrapper_drop_down_menu}>
          <Question id={id} title={title} />
          <h4 className={styles.answerOptionsBlock_title}>Добавьте варианты ответов:</h4>
          {answers?.map(({ body, answer_id }: AnswersT) => (
            <AnswerOption key={answer_id} body={body} />
          ))}
          <Button text={'+ Добавить вариант'} style={{ marginTop: '26px' }} variant={'primary'} />
        </div>
      )}
    </>
  )
}
