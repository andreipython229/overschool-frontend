import { Button } from 'components/common/Button/Button'
import styles from '../../StudentTestBlock/StudentQuestion/studentQuestion.module.scss'
import { FC, useEffect, useState } from 'react'

import { setShowType, StudentTestPreviewT } from '../../../../types/componentsTypes'
import { IconSvg } from 'components/common/IconSvg/IconSvg'
import { bigQuestionIconPath, questionIconPath } from 'Pages/StudentCourse/StudentTestBlock/StudentQuestion/assets/vectorPath'

export const StudentTestPreview: FC<StudentTestPreviewT> = ({ passStatus, setTestSended, setTestSuccess, setShow, lesson }) => {
  const [title, setTitle] = useState<string>('Тестирование для оценки усвоения материала :) Удачи! )')
  const [nameButton, setNameButton] = useState<string>('Начать тест')

  return (
    <div className={styles.wrapper}>
      <div className={styles.questionBlock}>
        <div className={styles.questionBlock_question}>
          <div className={styles.questionBlock_question_questionBlock}>
            <div className={styles.questionBlock_question_questionBlock_preview}>
              <h5>Тест №{lesson.test_id}</h5>
              <h2>{lesson.name}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '353px' }}>
                Количество вопросов: <span style={{ color: '#357EEB' }}>{lesson.questions.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '353px' }}>
                Время выполнения: <span style={{ color: '#357EEB' }}>00:00</span>
              </div>
              <Button text={nameButton} variant="newPrimary" className={styles.button} style={{ width: '259px' }} onClick={setShow} />
            </div>
          </div>
          <div className={styles.questionBlock_question_background}>
            <div className={styles.questionBlock_question_background_leftSide}>
              <div className={styles.questionBlock_question_background_leftSide_circleBg}></div>
            </div>
            <div className={styles.questionBlock_question_background_rightSide}>
              <IconSvg width={196.435547} height={802.730225} viewBoxSize="0 0 196.436 802.73" path={bigQuestionIconPath}>
                <defs>
                  <linearGradient
                    x1="4.000000"
                    y1="401.365112"
                    x2="192.435532"
                    y2="401.365112"
                    id="paint_linear_10504_50816_0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.135000" stopColor="#3170E7" />
                    <stop offset="1.000000" stopColor="#7A90F7" />
                  </linearGradient>
                </defs>
              </IconSvg>
              <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
              <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
              <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
              <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
              <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
              <IconSvg width={126} height={163} viewBoxSize="0 0 126 163" path={questionIconPath} />
              <div className={styles.questionBlock_question_background_rightSide_circleBg}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
